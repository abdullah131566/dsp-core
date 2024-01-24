import {
  FiniteInterval,
  InfiniteInterval,
  IntervalPair,
  LeftOpenInterval,
  RightOpenInterval
} from '../src/index';

describe('FiniteInterval', () => {
  const mockBegin = -5;
  const mockEnd = 10;
  const mockPair: IntervalPair = [mockBegin, mockEnd];

  it('should create a FiniteInterval with begin and end specified', () => {
    const mockInterval = new FiniteInterval({
      begin: mockBegin,
      end: mockEnd
    });
    expect(mockInterval.begin).toBe(mockBegin);
    expect(mockInterval.end).toBe(mockEnd);
  });

  it('should create a FiniteInterval with pair specified', () => {
    const mockInterval = new FiniteInterval({ pair: mockPair });
    expect(mockInterval.begin).toBe(mockBegin);
    expect(mockInterval.end).toBe(mockEnd);
  });

  it('should throw an error if constructed without a begin equal to end', () => {
    expect(
      () => new FiniteInterval({ begin: mockBegin, end: mockBegin })
    ).toThrowError();
  });

  it('should throw an error if constructed with a begin greater than end', () => {
    expect(
      () => new FiniteInterval({ begin: mockEnd, end: mockBegin })
    ).toThrowError();
  });

  it('should throw an error if constructed without a begin or end', () => {
    expect(() => new FiniteInterval({})).toThrowError();
  });

  it('should throw an error if constructed without a begin', () => {
    expect(() => new FiniteInterval({ end: mockEnd })).toThrowError();
  });

  it('should throw an error if constructed without an end', () => {
    expect(() => new FiniteInterval({ begin: mockBegin })).toThrowError();
  });
});

describe('InfiniteInterval', () => {
  it('should create an InfiniteInterval', () => {
    const mockInterval = new InfiniteInterval();
    expect(mockInterval.begin).toBe('-inf');
    expect(mockInterval.end).toBe('+inf');
  });
});

describe('LeftOpenInterval', () => {
  const mockEnd = 10;

  it('should create a LeftOpenInterval with end specified', () => {
    const mockInterval = new LeftOpenInterval({
      end: mockEnd
    });
    expect(mockInterval.end).toBe(mockEnd);
  });

  it('should have open begin', () => {
    const mockInterval = new LeftOpenInterval({
      end: mockEnd
    });
    expect(mockInterval.begin).toBe('-inf');
  });
});

describe('RightOpenInterval', () => {
  const mockBegin = -5;

  it('should create a RightOpenInterval with begin specified', () => {
    const mockInterval = new RightOpenInterval({
      begin: mockBegin
    });
    expect(mockInterval.begin).toBe(mockBegin);
  });

  it('should have open end', () => {
    const mockInterval = new RightOpenInterval({
      begin: mockBegin
    });
    expect(mockInterval.end).toBe('+inf');
  });
});
