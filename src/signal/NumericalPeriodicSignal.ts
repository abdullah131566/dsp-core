import {
  Interval,
  FiniteInterval,
  IntervalBeginClosed,
  IntervalEndClosed
} from './Interval';
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
  #interval: FiniteInterval;

  public constructor({
    intervalFunctionPairs,
    periodicMathmaticalFn,
    period
  }: NumericalPeriodicSignalConstructorArgs = {}) {
    const withFnAndPeriod =
      periodicMathmaticalFn !== undefined && period !== undefined;
    const withIntervalFunctionPairs = intervalFunctionPairs !== undefined;

    if (!withFnAndPeriod && !withIntervalFunctionPairs)
      throw new Error(
        'NumericalPeriodicSignal must be constructed with either periodicMathmaticalFn and period or intervalFunctionPairs'
      );

    super();
    if (withFnAndPeriod) {
      this.#interval = new FiniteInterval({ begin: 0, end: period - 1 });
      this.#intervalFunctionPairs = [[this.#interval, periodicMathmaticalFn]];
      this.#period = period;
    } else if (withIntervalFunctionPairs) {
      if (
        intervalFunctionPairs.some(([interval, _]) =>
          Interval.isOpenInterval(interval)
        )
      )
        throw new Error(
          'intervalFunctionPairs must not contain open intervals for periodic signals'
        );

      this.#intervalFunctionPairs = intervalFunctionPairs;

      const periodBegin = intervalFunctionPairs[0][0]
        .begin as IntervalBeginClosed;
      const periodEnd = intervalFunctionPairs[
        intervalFunctionPairs.length - 1
      ][0].end as IntervalEndClosed;

      this.#interval = new FiniteInterval({
        begin: periodBegin,
        end: periodEnd
      });
      this.#period = 1 + periodEnd - periodBegin;
    } else
      throw new Error(
        'Something went wrong in NumericalPeriodicSignal constructor'
      );
    this.#cache = new Map<number, Complex>();
  }

  async fetch(index: number): Promise<Complex> {
    const normalizedIndex = this.normalizeIndex(index);
    if (this.#cache.has(normalizedIndex)) {
      return this.#cache.get(normalizedIndex) as Complex;
    }
    const interval = this.#intervalFunctionPairs.find(([interval, _]) =>
      interval.contains(normalizedIndex)
    );
    if (interval === undefined) {
      throw new Error(`Interval not found for index ${index}`);
    }
    const [_, fn] = interval;
    const value = fn(normalizedIndex);
    this.#cache.set(normalizedIndex, value);
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
  private normalizeIndex(index: number): number {
    if (this.#interval.contains(index)) return index;

    const periodBegin = this.#interval.begin;
    const periodEnd = this.#interval.end;
    let multiplier: number;
    if (index < periodBegin)
      multiplier = Math.floor((periodEnd - index) / this.#period);
    else multiplier = Math.ceil((periodBegin - index) / this.#period);
    return index + multiplier * this.#period;
  }
}

export type NumericalFunction = (x: number) => Complex;
export type IntervalFunctionPair = [Interval, NumericalFunction];
