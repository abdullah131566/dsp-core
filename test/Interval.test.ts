import { Interval } from "../src/index";

describe('Interval', () => {
  it('should create an interval with default values', () => {
    const interval = new Interval();
    expect(interval.begin).toBe('-inf');
    expect(interval.end).toBe('+inf');
  });

  it('should create an interval with specified begin', () => {
    const interval = new Interval({ begin: 0 });
    expect(interval.begin).toBe(0);
    expect(interval.end).toBe('+inf');
  });

    it('should create an interval with specified end', () => {
        const interval = new Interval({ end: 10 });
        expect(interval.begin).toBe('-inf');
        expect(interval.end).toBe(10);
    });

  it('should create an interval with specified begin and end', () => {
    const interval = new Interval({ begin: 0, end: 10 });
    expect(interval.begin).toBe(0);
    expect(interval.end).toBe(10);
  });

  it('should create an interval with a pair', () => {
    const interval = new Interval({ pair: [0, 10] });
    expect(interval.begin).toBe(0);
    expect(interval.end).toBe(10);
  });

  it('should throw an error if begin and end are the same', () => {
    expect(() => new Interval({ begin: 0, end: 0 })).toThrowError();
  });

  it('should correctly determine if a value is contained in a finite interval', () => {
    const interval = new Interval({ begin: 0, end: 10 });
    expect(interval.contains(5)).toBe(true);
    expect(interval.contains(-1)).toBe(false);
    expect(interval.contains(11)).toBe(false);
  });
  it('should correctly determine if a value is contained in a left-open interval', () => {
    const interval = new Interval({ begin: '-inf', end: 10 });
    expect(interval.contains(5)).toBe(true);
    expect(interval.contains(-1000)).toBe(true);
    expect(interval.contains(11)).toBe(false);
  });

  it('should correctly determine if a value is contained in a right-open interval', () => {
    const interval = new Interval({ begin: 0, end: '+inf' });
    expect(interval.contains(5)).toBe(true);
    expect(interval.contains(1000)).toBe(true);
    expect(interval.contains(-1)).toBe(false);
  });
});
