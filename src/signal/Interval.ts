export type IntervalBeginClosed = number;
export type IntervalEndClosed = number;
export type IntervalBeginOpen = '-inf';
export type IntervalEndOpen = '+inf';
export type IntervalBegin = IntervalBeginClosed | IntervalBeginOpen;
export type IntervalEnd = IntervalEndClosed | IntervalEndOpen;
export type IntervalPair = [IntervalBegin, IntervalEnd];
export type IntervalValue = IntervalBegin | IntervalEnd;

export abstract class Interval {
  #begin: IntervalBegin;
  #end: IntervalEnd;
  public constructor({
    begin,
    end,
    pair
  }: {
    begin?: IntervalBegin;
    end?: IntervalEnd;
    pair?: IntervalPair;
  } = {}) {
    if (pair !== undefined) {
      [begin, end] = pair;
    }
    if (begin !== undefined && end !== undefined && begin >= end)
      throw new Error("interval's begin and end cannot be the same");
    this.#begin = begin ?? '-inf';
    this.#end = end ?? '+inf';
  }
  public get begin(): IntervalBegin {
    return this.#begin;
  }
  public get end(): IntervalEnd {
    return this.#end;
  }
  public contains(value: number): boolean {
    return (
      (this.#begin === '-inf' || value >= this.#begin) &&
      (this.#end === '+inf' || value <= this.#end)
    );
  }
  static isOpenInterval = (interval: Interval): boolean => {
    return interval.begin === '-inf' || interval.end === '+inf';
  };
}

export class InfiniteInterval extends Interval {
  public constructor() {
    super({});
  }
  public get begin(): IntervalBeginOpen {
    return super.begin as IntervalBeginOpen;
  }
  public get end(): IntervalEndOpen {
    return super.end as IntervalEndOpen;
  }
}

export class FiniteInterval extends Interval {
  public constructor({
    begin,
    end,
    pair
  }: {
    begin?: IntervalBeginClosed;
    end?: IntervalEndClosed;
    pair?: IntervalPair;
  }) {
    if (
      !((pair && pair.length > 0) || (begin !== undefined && end !== undefined))
    )
      throw new Error(
        'FiniteInterval must be constructed with a begin and end'
      );
    super({ begin, end, pair });
  }
  public get begin(): IntervalBeginClosed {
    return super.begin as number;
  }
  public get end(): IntervalEndClosed {
    return super.end as number;
  }
}

export class LeftOpenInterval extends Interval {
  public constructor({ end }: { end: IntervalEndClosed }) {
    if (end === undefined)
      throw new Error('LeftOpenInterval must be constructed with an end');
    super({ end });
  }
  public get begin(): IntervalBeginOpen {
    return super.begin as IntervalBeginOpen;
  }
  public get end(): IntervalEndClosed {
    return super.end as IntervalEndClosed;
  }
}

export class RightOpenInterval extends Interval {
  public constructor({ begin }: { begin: IntervalBeginClosed }) {
    if (begin === undefined)
      throw new Error('RightOpenInterval must be constructed with a begin');
    super({ begin });
  }
  public get begin(): IntervalBeginClosed {
    return super.begin as IntervalBeginClosed;
  }
  public get end(): IntervalEndOpen {
    return super.end as IntervalEndOpen;
  }
}
