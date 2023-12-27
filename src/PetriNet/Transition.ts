export class Transition {
  private static nextTransitionId = 1;

  public quantity = 0;
  public meanBusinessParts = 0;

  constructor(
    public readonly name = `T${Transition.nextTransitionId++}`,
    public readonly delay = 1,
    public processing = false
  ) {}
}
