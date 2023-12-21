import { ArcIn, ArcOut } from './Arc';
import { Place } from './Place';
import { Transition } from './Transition';

export class ArcsMap extends Map<
  Transition,
  { arcsIn: ArcIn[]; arcsOut: ArcOut[] }
> {
  public connectIn(source: Place, target: Transition, multiplicity: number) {
    const arcs = this.get(target) || { arcsIn: [], arcsOut: [] };

    arcs.arcsIn.push({ source, target, multiplicity });

    this.set(target, arcs);

    return this;
  }

  public connectOut(source: Transition, target: Place, multiplicity: number) {
    const arcs = this.get(source) || { arcsIn: [], arcsOut: [] };

    arcs.arcsOut.push({ source, target, multiplicity });

    this.set(source, arcs);

    return this;
  }

  public setupTransitionConnections(
    transition: Transition,
    options: {
      sources?: { place: Place; multiplicity: number }[];
      targets?: { place: Place; multiplicity: number }[];
    }
  ) {
    const sources = options.sources || [];
    const targets = options.targets || [];

    for (const { place: source, multiplicity } of sources) {
      this.connectIn(source, transition, multiplicity);
    }

    for (const { place: target, multiplicity } of targets) {
      this.connectOut(transition, target, multiplicity);
    }

    return this;
  }
}
