import { ArcsMap } from './ArcsMap';
import { PetriNet } from './PetriNet';
import { Place } from './Place';
import { Transition } from './Transition';

const runTestTask = () => {
  const place1 = new Place();
  const place2 = new Place(1);
  const place3 = new Place();
  const place4 = new Place();
  const place5 = new Place(1);
  const place6 = new Place();
  const place7 = new Place();
  const place8 = new Place();
  const place9 = new Place();
  const place10 = new Place();

  const places = [
    place1,
    place2,
    place3,
    place4,
    place5,
    place6,
    place7,
    place8,
    place9,
    place10,
  ];

  const tr1 = new Transition();
  const tr2 = new Transition();
  const tr3 = new Transition();
  const tr4 = new Transition();
  const tr5 = new Transition();
  const tr6 = new Transition();
  const tr7 = new Transition();
  const tr8 = new Transition();

  const transitions = [tr1, tr2, tr3, tr4, tr5, tr6, tr7, tr8];

  const arcsMap = new ArcsMap();

  arcsMap
    .setupTransitionConnections(tr1, {
      sources: [{ place: place2, multiplicity: 1 }],
      targets: [{ place: place1, multiplicity: 1 }],
    })
    .setupTransitionConnections(tr2, {
      sources: [{ place: place1, multiplicity: 1 }],
      targets: [
        { place: place3, multiplicity: 1 },
        { place: place2, multiplicity: 1 },
      ],
    })
    .setupTransitionConnections(tr3, {
      sources: [
        { place: place3, multiplicity: 1 },
        { place: place5, multiplicity: 1 },
      ],
      targets: [{ place: place4, multiplicity: 1 }],
    })
    .setupTransitionConnections(tr4, {
      sources: [{ place: place4, multiplicity: 1 }],
      targets: [
        { place: place5, multiplicity: 1 },
        { place: place6, multiplicity: 1 },
      ],
    })
    .setupTransitionConnections(tr5, {
      sources: [{ place: place6, multiplicity: 1 }],
      targets: [{ place: place7, multiplicity: 1 }],
    })
    .setupTransitionConnections(tr6, {
      sources: [{ place: place6, multiplicity: 1 }],
      targets: [{ place: place8, multiplicity: 1 }],
    })
    .setupTransitionConnections(tr7, {
      sources: [{ place: place6, multiplicity: 1 }],
      targets: [{ place: place9, multiplicity: 1 }],
    })
    .setupTransitionConnections(tr8, {
      sources: [{ place: place6, multiplicity: 1 }],
      targets: [{ place: place10, multiplicity: 1 }],
    });

  const petriNet = new PetriNet(places, transitions, arcsMap);

  petriNet.simulate(1000);
  petriNet.logResults();
};

runTestTask();
