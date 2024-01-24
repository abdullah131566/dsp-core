import {
  NumericalPeriodicSignal,
  NumericalFunction,
  IntervalFunctionPair,
  FiniteInterval,
  Complex
} from '../src/index';

describe('NumericalPeriodicSignal Test Suite 1', () => {
  const mockFn: NumericalFunction = jest.fn((x: number) => [x, x]);
  const mockInterval = new FiniteInterval({ begin: 0, end: 10 });
  const mockPeriod = 11;
  const mockIntervalFunctionPair: IntervalFunctionPair = [mockInterval, mockFn];

  it('should create a NumericalPeriodicSignal with periodicMathmaticalFn and period', () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: mockPeriod
    });
    expect(signal.period).toBe(mockPeriod);
  });

  it('should create a NumericalPeriodicSignal with intervalFunctionPairs', () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: [mockIntervalFunctionPair]
    });
    expect(signal.period).toBe(mockPeriod);
  });

  it('should throw an error if neither periodicMathmaticalFn and period nor intervalFunctionPairs are provided', () => {
    expect(() => new NumericalPeriodicSignal()).toThrowError();
  });

  it('should fetch a value', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: mockPeriod
    });
    const value = await signal.fetch(5);
    expect(value).toEqual([5, 5]);
  });

  it('should fetch a real value', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: mockPeriod
    });
    const value = await signal.fetchReal(5);
    expect(value).toBe(5);
  });

  it('should fetch an imaginary value', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: mockPeriod
    });
    const value = await signal.fetchImag(5);
    expect(value).toBe(5);
  });

  it('should fetch same value for periodic index', async () => {
    const signal = new NumericalPeriodicSignal({
      periodicMathmaticalFn: mockFn,
      period: mockPeriod
    });
    const value1 = await signal.fetch(0);
    const value2 = await signal.fetch(0 + mockPeriod);
    expect(value1).toEqual(value2);
    const value3 = await signal.fetch(3);
    const value4 = await signal.fetch(3 + mockPeriod);
    expect(value3).toEqual(value4);
    const value5 = await signal.fetch(9);
    const value6 = await signal.fetch(9 + mockPeriod);
    expect(value5).toEqual(value6);
    const value7 = await signal.fetch(222);
    const value8 = await signal.fetch(222 + mockPeriod);
    expect(value7).toEqual(value8);
  });
});

describe('NumericalPeriodicSignal Test Suite 2', () => {
  const mockSequenceInterval = new FiniteInterval({ begin: -4, end: -1 });
  const mockSequenceFn: NumericalFunction = jest.fn((x: number) => {
    return [[1, 0, -1, -2][x], 0];
  });
  const mockIntervalFunctionPairs: IntervalFunctionPair[] = [
    [new FiniteInterval({ pair: [-10, -5] }), (x: number) => [x, 0]],
    [mockSequenceInterval, mockSequenceFn]
  ];
  const mockPeriod2 = 10;

  it('should create a NumericalPeriodicSignal with intervalFunctionPairs', () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: mockIntervalFunctionPairs
    });
    expect(signal.period).toBe(mockPeriod2);
  });

  it('should fetch a value', async () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: mockIntervalFunctionPairs
    });
    const value = await signal.fetch(5);
    expect(value).toEqual([-5, 0]);
  });

  it('should fetch a real value', async () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: mockIntervalFunctionPairs
    });
    const value = await signal.fetchReal(5);
    expect(value).toBe(-5);
  });

  it('should fetch an imaginary value', async () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: mockIntervalFunctionPairs
    });
    const value = await signal.fetchImag(5);
    expect(value).toBe(0);
  });

  it('should fetch same value for periodic index', async () => {
    const signal = new NumericalPeriodicSignal({
      intervalFunctionPairs: mockIntervalFunctionPairs
    });
    const value1 = await signal.fetch(-4);
    const value2 = await signal.fetch(-4 + mockPeriod2);
    expect(value1).toEqual(value2);
    const value3 = await signal.fetch(-3);
    const value4 = await signal.fetch(-3 + mockPeriod2);
    expect(value3).toEqual(value4);
    const value5 = await signal.fetch(-2321);
    const value6 = await signal.fetch(-2321 + mockPeriod2);
    expect(value5).toEqual(value6);
    const value7 = await signal.fetch(-1);
    const value8 = await signal.fetch(-1 + mockPeriod2);
    expect(value7).toEqual(value8);
  });
});
