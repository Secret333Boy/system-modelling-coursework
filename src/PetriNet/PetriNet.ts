import { ArcsMap } from './ArcsMap';
import { Place } from './Place';
import { Transition } from './Transition';

export class PetriNet {
  private currentTick = 1;

  constructor(
    private readonly places: Place[] = [],
    private readonly transitions: Transition[] = [],
    private readonly arcs: ArcsMap = new ArcsMap()
  ) {}

  public simulate(ticks: number) {
    while (this.currentTick <= ticks) {
      // OUT
      for (const transition of this.transitions) {
        transition.currentTick = this.currentTick;

        const transitionArcs = this.arcs.get(transition);
        if (!transitionArcs) continue;

        const { arcsOut } = transitionArcs;

        if (
          transition.nextOutTick === transition.currentTick &&
          transition.processing > 0
        ) {
          for (const arcOut of arcsOut) {
            arcOut.target.markers += arcOut.multiplicity;
          }
          transition.processing--;
          transition.quantity++;

          if (transition.processing === 0) transition.nextOutTick = Infinity;
        }
      }

      // IN
      const transitionsToBeActivated: Transition[] = this.transitions.slice();

      while (transitionsToBeActivated.length !== 0) {
        const randomIndex = Math.floor(
          Math.random() * transitionsToBeActivated.length
        );

        const transition = transitionsToBeActivated.splice(randomIndex, 1)[0];

        const transitionArcs = this.arcs.get(transition);
        if (!transitionArcs) continue;

        const { arcsIn } = transitionArcs;

        if (
          !arcsIn.every((arcIn) => arcIn.source.markers >= arcIn.multiplicity)
        )
          continue;

        for (const arcIn of arcsIn) {
          arcIn.source.markers -= arcIn.multiplicity;
        }

        transition.processing++;
        transition.nextOutTick = transition.currentTick + transition.delay;
      }

      this.doStatistics(1);

      // if (this.currentTick % 1000 === 0) {
      //   console.log(`!!!${this.currentTick}!!!`);
      //   this.logResults();
      // }
      this.currentTick++;
    }
  }

  public traceTree(ticks: number) {
    const treeNodeDictionary = new Set<string>();

    const initialMarking = this.getMarkingsToken();

    treeNodeDictionary.add(initialMarking);
    const markingTargets: Record<string, Set<string>> = {
      [initialMarking]: new Set(),
    };

    let prevMarking = this.getMarkingsToken();

    while (this.currentTick <= ticks) {
      // OUT
      for (const transition of this.transitions) {
        transition.currentTick = this.currentTick;

        const transitionArcs = this.arcs.get(transition);
        if (!transitionArcs) continue;

        const { arcsOut } = transitionArcs;

        if (
          transition.nextOutTick === transition.currentTick &&
          transition.processing > 0
        ) {
          for (const arcOut of arcsOut) {
            arcOut.target.markers += arcOut.multiplicity;
          }
          transition.processing--;
          transition.quantity++;

          if (transition.processing === 0) transition.nextOutTick = Infinity;
        }
      }

      const nextMarking = this.getMarkingsToken();

      if (!markingTargets[prevMarking]) markingTargets[prevMarking] = new Set();
      markingTargets[prevMarking].add(nextMarking);

      treeNodeDictionary.add(nextMarking);
      prevMarking = nextMarking;

      // IN
      const transitionsToBeActivated: Transition[] = this.transitions.slice();

      while (transitionsToBeActivated.length !== 0) {
        const randomIndex = Math.floor(
          Math.random() * transitionsToBeActivated.length
        );

        const transition = transitionsToBeActivated.splice(randomIndex, 1)[0];

        const transitionArcs = this.arcs.get(transition);
        if (!transitionArcs) continue;

        const { arcsIn } = transitionArcs;

        if (
          !arcsIn.every((arcIn) => arcIn.source.markers >= arcIn.multiplicity)
        )
          continue;

        for (const arcIn of arcsIn) {
          arcIn.source.markers -= arcIn.multiplicity;
        }

        transition.processing++;
        transition.nextOutTick = transition.currentTick + transition.delay;
      }

      this.doStatistics(1);
      this.currentTick++;
    }

    console.log(treeNodeDictionary);
    console.log(markingTargets);
  }

  public getMarkings() {
    return this.places.map((place) => place.markers);
  }

  public getMarkingsToken() {
    return this.getMarkings().join('');
  }

  public doStatistics(delta: number) {
    for (const place of this.places) {
      place.meanValueParts += place.markers / delta;
    }

    for (const transition of this.transitions) {
      transition.meanBusinessParts += transition.processing / delta;
    }
  }

  public logResults() {
    console.log('PLACES');

    for (const place of this.places) {
      console.log(`${place.name}:`);
      console.log(`current markers: ${place.markers}`);
      console.log(`mean value: ${place.meanValueParts / this.currentTick}`);
    }

    console.log();

    console.log('TRANSITIONS');
    for (const transition of this.transitions) {
      console.log(`${transition.name}:`);
      console.log(`current processing: ${transition.processing}`);
      console.log(`quantity: ${transition.quantity}`);
      console.log(
        `mean business: ${transition.meanBusinessParts / this.currentTick}`
      );
    }
  }
}
