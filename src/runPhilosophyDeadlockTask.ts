import { ArcsMap } from './PetriNet/ArcsMap';
import { PetriNet } from './PetriNet/PetriNet';
import { Place } from './PetriNet/Place';
import { Transition } from './PetriNet/Transition';

const runPhilosophyDeadlockTask = () => {
  const stick1 = new Place(1, 'stick1');
  const stick2 = new Place(1, 'stick2');
  const stick3 = new Place(1, 'stick3');
  const stick4 = new Place(1, 'stick4');
  const stick5 = new Place(1, 'stick5');

  const philosopher1LeftPicked = new Place(0, 'LeftPicked1');
  const philosopher1RightPicked = new Place(0, 'RightPicked1');
  const philosopher1Eat = new Place(0, 'Eat1');
  const philosopher1Think = new Place(1, 'Think1');

  const philosopher2LeftPicked = new Place(0, 'LeftPicked2');
  const philosopher2RightPicked = new Place(0, 'RightPicked2');
  const philosopher2Eat = new Place(0, 'Eat2');
  const philosopher2Think = new Place(1, 'Think2');

  const philosopher3LeftPicked = new Place(0, 'LeftPicked3');
  const philosopher3RightPicked = new Place(0, 'RightPicked3');
  const philosopher3Eat = new Place(0, 'Eat3');
  const philosopher3Think = new Place(1, 'Think3');

  const philosopher4LeftPicked = new Place(0, 'LeftPicked4');
  const philosopher4RightPicked = new Place(0, 'RightPicked4');
  const philosopher4Eat = new Place(0, 'Eat4');
  const philosopher4Think = new Place(1, 'Think4');

  const philosopher5LeftPicked = new Place(0, 'LeftPicked5');
  const philosopher5RightPicked = new Place(0, 'RightPicked5');
  const philosopher5Eat = new Place(0, 'Eat5');
  const philosopher5Think = new Place(1, 'Think5');

  const places = [
    stick1,
    stick2,
    stick3,
    stick4,
    stick5,
    philosopher1LeftPicked,
    philosopher1RightPicked,
    philosopher1Eat,
    philosopher1Think,
    philosopher2LeftPicked,
    philosopher2RightPicked,
    philosopher2Eat,
    philosopher2Think,
    philosopher3LeftPicked,
    philosopher3RightPicked,
    philosopher3Eat,
    philosopher3Think,
    philosopher4LeftPicked,
    philosopher4RightPicked,
    philosopher4Eat,
    philosopher4Think,
    philosopher5LeftPicked,
    philosopher5RightPicked,
    philosopher5Eat,
    philosopher5Think,
  ];

  const philosopher1PickLeft = new Transition('Pick1Left');
  const philosopher1PickRight = new Transition('Pick1Right');
  const philosopher1StartEating = new Transition('StartEating1');
  const philosopher1Put = new Transition('Put1');

  const philosopher2PickLeft = new Transition('Pick2Left');
  const philosopher2PickRight = new Transition('Pick2Right');
  const philosopher2StartEating = new Transition('StartEating2');
  const philosopher2Put = new Transition('Put2');

  const philosopher3PickLeft = new Transition('Pick3Left');
  const philosopher3PickRight = new Transition('Pick3Right');
  const philosopher3StartEating = new Transition('StartEating3');
  const philosopher3Put = new Transition('Put3');

  const philosopher4PickLeft = new Transition('Pick4Left');
  const philosopher4PickRight = new Transition('Pick4Right');
  const philosopher4StartEating = new Transition('StartEating4');
  const philosopher4Put = new Transition('Put4');

  const philosopher5PickLeft = new Transition('Pick5Left');
  const philosopher5PickRight = new Transition('Pick5Right');
  const philosopher5StartEating = new Transition('StartEating5');
  const philosopher5Put = new Transition('Put5');

  const transitions = [
    philosopher1PickLeft,
    philosopher1PickRight,
    philosopher1StartEating,
    philosopher1Put,
    philosopher2PickLeft,
    philosopher2PickRight,
    philosopher2StartEating,
    philosopher2Put,
    philosopher3PickLeft,
    philosopher3PickRight,
    philosopher3StartEating,
    philosopher3Put,
    philosopher4PickLeft,
    philosopher4PickRight,
    philosopher4StartEating,
    philosopher4Put,
    philosopher5PickLeft,
    philosopher5PickRight,
    philosopher5StartEating,
    philosopher5Put,
  ];

  const arcsMap = new ArcsMap();

  arcsMap
    .setupTransitionConnections(philosopher1PickLeft, {
      sources: [{ place: stick1, multiplicity: 1 }],
      targets: [{ place: philosopher1LeftPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1PickRight, {
      sources: [{ place: stick5, multiplicity: 1 }],
      targets: [{ place: philosopher1RightPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1StartEating, {
      sources: [
        { place: philosopher1LeftPicked, multiplicity: 1 },
        { place: philosopher1RightPicked, multiplicity: 1 },
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
    //
    .setupTransitionConnections(philosopher2PickLeft, {
      sources: [{ place: stick2, multiplicity: 1 }],
      targets: [{ place: philosopher2LeftPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1PickRight, {
      sources: [{ place: stick1, multiplicity: 1 }],
      targets: [{ place: philosopher2RightPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher2StartEating, {
      sources: [
        { place: philosopher2LeftPicked, multiplicity: 1 },
        { place: philosopher2RightPicked, multiplicity: 1 },
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
    //
    .setupTransitionConnections(philosopher3PickLeft, {
      sources: [{ place: stick3, multiplicity: 1 }],
      targets: [{ place: philosopher3LeftPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1PickRight, {
      sources: [{ place: stick2, multiplicity: 1 }],
      targets: [{ place: philosopher3RightPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher3StartEating, {
      sources: [
        { place: philosopher3LeftPicked, multiplicity: 1 },
        { place: philosopher3RightPicked, multiplicity: 1 },
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
    //
    .setupTransitionConnections(philosopher4PickLeft, {
      sources: [{ place: stick4, multiplicity: 1 }],
      targets: [{ place: philosopher4LeftPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1PickRight, {
      sources: [{ place: stick3, multiplicity: 1 }],
      targets: [{ place: philosopher4RightPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher4StartEating, {
      sources: [
        { place: philosopher4LeftPicked, multiplicity: 1 },
        { place: philosopher4RightPicked, multiplicity: 1 },
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
    //
    .setupTransitionConnections(philosopher5PickLeft, {
      sources: [{ place: stick5, multiplicity: 1 }],
      targets: [{ place: philosopher5LeftPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1PickRight, {
      sources: [{ place: stick4, multiplicity: 1 }],
      targets: [{ place: philosopher5RightPicked, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher5StartEating, {
      sources: [
        { place: philosopher5LeftPicked, multiplicity: 1 },
        { place: philosopher5RightPicked, multiplicity: 1 },
        { place: philosopher5Think, multiplicity: 1 },
      ],
      targets: [{ place: philosopher5Eat, multiplicity: 1 }],
    })
    .setupTransitionConnections(philosopher1Put, {
      sources: [{ place: philosopher5Eat, multiplicity: 1 }],
      targets: [
        { place: stick5, multiplicity: 1 },
        { place: stick4, multiplicity: 1 },
        { place: philosopher5Think, multiplicity: 1 },
      ],
    });

  const petriNet = new PetriNet(places, transitions, arcsMap);

  petriNet.simulate(1000);
  petriNet.logResults();
};

export default runPhilosophyDeadlockTask;
