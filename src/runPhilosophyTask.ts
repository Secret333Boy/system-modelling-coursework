import { ArcsMap } from './PetriNet/ArcsMap';
import { PetriNet } from './PetriNet/PetriNet';
import { Place } from './PetriNet/Place';
import { Transition } from './PetriNet/Transition';

const runPhilosophyTask = () => {
  const stick1 = new Place(1, 'stick1');
  const stick2 = new Place(1, 'stick2');
  const stick3 = new Place(1, 'stick3');
  const stick4 = new Place(1, 'stick4');
  const stick5 = new Place(1, 'stick5');

  const philosopher1Eat = new Place(0, 'Eat1');
  const philosopher1Think = new Place(1, 'Think1');

  const philosopher2Eat = new Place(0, 'Eat2');
  const philosopher2Think = new Place(1, 'Think2');

  const philosopher3Eat = new Place(0, 'Eat3');
  const philosopher3Think = new Place(1, 'Think3');

  const philosopher4Eat = new Place(0, 'Eat4');
  const philosopher4Think = new Place(1, 'Think4');

  const philosopher5Eat = new Place(0, 'Eat5');
  const philosopher5Think = new Place(1, 'Think5');

  const places = [
    stick1,
    stick2,
    stick3,
    stick4,
    stick5,
    philosopher1Eat,
    philosopher1Think,
    philosopher2Eat,
    philosopher2Think,
    philosopher3Eat,
    philosopher3Think,
    philosopher4Eat,
    philosopher4Think,
    philosopher5Eat,
    philosopher5Think,
  ];

  const philosopher1Pick = new Transition('Pick1', 1);
  const philosopher1Put = new Transition('Put1', 1);

  const philosopher2Pick = new Transition('Pick2', 1);
  const philosopher2Put = new Transition('Put2', 1);

  const philosopher3Pick = new Transition('Pick3', 1);
  const philosopher3Put = new Transition('Put3', 1);

  const philosopher4Pick = new Transition('Pick4', 1);
  const philosopher4Put = new Transition('Put4', 1);

  const philosopher5Pick = new Transition('Pick5', 1);
  const philosopher5Put = new Transition('Put5', 1);

  const transitions = [
    philosopher1Pick,
    philosopher1Put,
    philosopher2Pick,
    philosopher2Put,
    philosopher3Pick,
    philosopher3Put,
    philosopher4Pick,
    philosopher4Put,
    philosopher5Pick,
    philosopher5Put,
  ];

  const arcsMap = new ArcsMap();

  arcsMap
    .setupTransitionConnections(philosopher1Pick, {
      sources: [
        { place: stick1, multiplicity: 1 },
        { place: stick5, multiplicity: 1 },
        { place: philosopher1Think, multiplicity: 1 },
      ],
      targets: [{ place: philosopher1Eat, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1Put, {
      sources: [{ place: philosopher1Eat, multiplicity: 1 }],
      targets: [
        { place: stick1, multiplicity: 1 },
        { place: stick5, multiplicity: 1 },
        { place: philosopher1Think, multiplicity: 1 },
      ],
    })
    .setupTransitionConnections(philosopher2Pick, {
      sources: [
        { place: stick2, multiplicity: 1 },
        { place: stick1, multiplicity: 1 },
        { place: philosopher2Think, multiplicity: 1 },
      ],
      targets: [{ place: philosopher2Eat, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher2Put, {
      sources: [{ place: philosopher2Eat, multiplicity: 1 }],
      targets: [
        { place: stick2, multiplicity: 1 },
        { place: stick1, multiplicity: 1 },
        { place: philosopher2Think, multiplicity: 1 },
      ],
    })
    .setupTransitionConnections(philosopher3Pick, {
      sources: [
        { place: stick3, multiplicity: 1 },
        { place: stick2, multiplicity: 1 },
        { place: philosopher3Think, multiplicity: 1 },
      ],
      targets: [{ place: philosopher3Eat, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher3Put, {
      sources: [{ place: philosopher3Eat, multiplicity: 1 }],
      targets: [
        { place: stick3, multiplicity: 1 },
        { place: stick2, multiplicity: 1 },
        { place: philosopher3Think, multiplicity: 1 },
      ],
    })
    .setupTransitionConnections(philosopher4Pick, {
      sources: [
        { place: stick4, multiplicity: 1 },
        { place: stick3, multiplicity: 1 },
        { place: philosopher4Think, multiplicity: 1 },
      ],
      targets: [{ place: philosopher4Eat, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher4Put, {
      sources: [{ place: philosopher4Eat, multiplicity: 1 }],
      targets: [
        { place: stick4, multiplicity: 1 },
        { place: stick3, multiplicity: 1 },
        { place: philosopher4Think, multiplicity: 1 },
      ],
    })
    .setupTransitionConnections(philosopher5Pick, {
      sources: [
        { place: stick5, multiplicity: 1 },
        { place: stick4, multiplicity: 1 },
        { place: philosopher5Think, multiplicity: 1 },
      ],
      targets: [{ place: philosopher5Eat, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher5Put, {
      sources: [{ place: philosopher5Eat, multiplicity: 1 }],
      targets: [
        { place: stick5, multiplicity: 1 },
        { place: stick4, multiplicity: 1 },
        { place: philosopher5Think, multiplicity: 1 },
      ],
    });

  const petriNet = new PetriNet(places, transitions, arcsMap);

  const time = 10000;

  petriNet.simulate(time);
  petriNet.logResults();

  const meanTimeThinking =
    [
      philosopher1Think,
      philosopher2Think,
      philosopher3Think,
      philosopher4Think,
      philosopher5Think,
    ]
      .map((place) => place.meanValueParts)
      .reduce((acc, el) => acc + el) /
    (5 * time);

  const meanEaten =
    [
      philosopher1Put,
      philosopher2Put,
      philosopher3Put,
      philosopher4Put,
      philosopher5Put,
    ]
      .map((transition) => transition.quantity)
      .reduce((acc, el) => acc + el) / 5;

  console.log();

  console.log(`Mean time thinking: ${meanTimeThinking}`);
  console.log(`Mean eaten: ${meanEaten}`);
};

export default runPhilosophyTask;
