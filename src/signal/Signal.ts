export type Complex = [number, number];

export abstract class Signal<T> {
  abstract fetch(index: number): Promise<T>;
}

export abstract class NumericalSignal extends Signal<Complex> {
  abstract fetchReal(index: number): Promise<number>;
  abstract fetchImag(index: number): Promise<number>;
}
