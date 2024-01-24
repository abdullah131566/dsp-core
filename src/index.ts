// Exporting from signal/Signal.ts
export type { Complex } from './signal/Signal';

// Exporting from signal/Interval.ts
export {
  Interval,
  FiniteInterval,
  InfiniteInterval,
  LeftOpenInterval,
  RightOpenInterval
} from './signal/Interval';
export type {
  IntervalValue,
  IntervalBegin,
  IntervalEnd,
  IntervalPair,
  IntervalBeginClosed,
  IntervalEndClosed,
  IntervalBeginOpen,
  IntervalEndOpen
} from './signal/Interval';

// Export from signal/NumericalPeriodicSignal.ts
export { NumericalPeriodicSignal } from './signal/NumericalPeriodicSignal';
export type {
  IntervalFunctionPair,
  NumericalFunction
} from './signal/NumericalPeriodicSignal';
