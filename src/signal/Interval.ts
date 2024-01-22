export type IntervalValueBegin = number | '-inf';
export type IntervalValueEnd = number | '+inf';
export type IntervalValue = IntervalValueBegin | IntervalValueEnd;

export class Interval {
  #begin: IntervalValueBegin;
  #end: IntervalValueEnd;
  public constructor({
    begin,
    end,
    pair
  }: {
    begin?: IntervalValueBegin;
    end?: IntervalValueEnd;
    pair?: [IntervalValueBegin, IntervalValueEnd];
  } = {}) {
    if (pair !== undefined) {
      [begin, end] = pair;
    }
    if (begin === end && begin !== undefined && end !== undefined)
      throw new Error("interval's begin and end cannot be the same");
    this.#begin = begin ?? '-inf';
    this.#end = end ?? '+inf';
  }
  public get begin(): IntervalValueBegin {
    return this.#begin;
  }
  public get end(): IntervalValueEnd {
    return this.#end;
  }
  public contains(value: number): boolean {
    return (
      (this.#begin === '-inf' || value >= this.#begin) &&
      (this.#end === '+inf' || value <= this.#end)
    );
  }
}
