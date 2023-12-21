import { Place } from './Place';
import { Transition } from './Transition';

export interface ArcIn {
  readonly source: Place;
  readonly target: Transition;
  readonly multiplicity: number;
}

export interface ArcOut {
  readonly target: Place;
  readonly source: Transition;
  readonly multiplicity: number;
}

export type Arc = ArcIn | ArcOut;
