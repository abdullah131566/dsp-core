import {
  NumericalPeriodicSignal,
  NumericalFunction,
  IntervalFunctionPair,
  Interval,
  Complex
} from '../src/index';

describe('NumericalPeriodicSignal', () => {
  const mockFn: NumericalFunction = jest.fn((x: number) => [x, x]);
  const mockInterval = new Interval({ begin: 0, end: 10 });
  const mockIntervalFunctionPair: IntervalFunctionPair = [mockInterval, mockFn];

  it('should create a NumericalPeriodicSignal with periodicMathmaticalFn and period', () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: 10
    });
    expect(signal.period).toBe(10);
  });

  it('should create a NumericalPeriodicSignal with intervalFunctionPairs', () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: [mockIntervalFunctionPair]
    });
    expect(signal.period).toBe(10);
  });

  it('should throw an error if neither periodicMathmaticalFn and period nor intervalFunctionPairs are provided', () => {
    expect(() => new NumericalPeriodicSignal()).toThrowError();
  });

  it('should throw an error if intervalFunctionPairs contain infinite intervals', () => {
    const infiniteInterval = new Interval();
    const infiniteIntervalFunctionPair: IntervalFunctionPair = [
      infiniteInterval,
      mockFn
    ];
    expect(
      () =>
        new NumericalPeriodicSignal({
          intervalFunctionPairs: [infiniteIntervalFunctionPair]
        })
    ).toThrowError();
  });

  it('should fetch a value', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: 10
    });
    const value = await signal.fetch(5);
    expect(value).toEqual([5, 5]);
  });

  it('should fetch a real value', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: 10
    });
    const value = await signal.fetchReal(5);
    expect(value).toBe(5);
  });

  it('should fetch an imaginary value', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: 10
    });
    const value = await signal.fetchImag(5);
    expect(value).toBe(5);
  });

  it('should throw an error if fetching a value outside the interval', async () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: [mockIntervalFunctionPair]
    });
    await expect(signal.fetch(15)).rejects.toThrowError();
  });
});
