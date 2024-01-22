import { Interval } from './Interval';
import { Complex, NumericalSignal } from './Signal';

type NumericalPeriodicSignalConstructorArgs = {
  intervalFunctionPairs?: IntervalFunctionPair[];
  periodicMathmaticalFn?: NumericalFunction;
  period?: number;
};

export class NumericalPeriodicSignal extends NumericalSignal {
  #period: number;
  #intervalFunctionPairs: IntervalFunctionPair[];
  #cache: Map<number, Complex>;
  public constructor({
    intervalFunctionPairs,
    periodicMathmaticalFn,
    period
  }: NumericalPeriodicSignalConstructorArgs = {}) {
    super();
    if (periodicMathmaticalFn !== undefined && period !== undefined) {
      const interval = new Interval();
      this.#intervalFunctionPairs = [[interval, periodicMathmaticalFn]];
      this.#period = period;
    } else if (intervalFunctionPairs && intervalFunctionPairs.length > 0) {
      if (
        intervalFunctionPairs.some(
          ([interval, _]) =>
            interval.begin === '-inf' || interval.end === '+inf'
        )
      )
        throw new Error(
          'intervalFunctionPairs must not contain infinite intervals for periodic signals'
        );
      this.#intervalFunctionPairs = intervalFunctionPairs;
      this.#period =
        (intervalFunctionPairs[intervalFunctionPairs.length - 1][0]
          .end as number) - (intervalFunctionPairs[0][0].begin as number);
    } else
      throw new Error(
        'intervalFunctionPairs or periodicMathmaticalFn and period must be specified'
      );
    this.#cache = new Map<number, Complex>();
  }
  async fetch(index: number): Promise<Complex> {
    if (this.#cache.has(index)) {
      return this.#cache.get(index) as Complex;
    }
    const interval = this.#intervalFunctionPairs.find(([interval, _]) =>
      interval.contains(index)
    );
    if (interval === undefined) {
      throw new Error(`Interval not found for index ${index}`);
    }
    const [_, fn] = interval;
    const value = fn(index);
    this.#cache.set(index, value);
    return value;
  }

  async fetchReal(index: number): Promise<number> {
    return (await this.fetch(index))[0];
  }

  async fetchImag(index: number): Promise<number> {
    return (await this.fetch(index))[1];
  }
  public get period(): number {
    return this.#period;
  }
}

export type NumericalFunction = (x: number) => Complex;
export type IntervalFunctionPair = [Interval, NumericalFunction];
