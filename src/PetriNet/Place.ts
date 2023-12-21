export class Place {
  private static nextPlaceId = 1;

  public meanValueParts = 0;

  constructor(
    public markers = 0,
    public readonly name = `P${Place.nextPlaceId++}`
  ) {}
}
