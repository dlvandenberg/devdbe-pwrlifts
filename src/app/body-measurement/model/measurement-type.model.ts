export class MeasurementType {
  static readonly WEIGHT = new MeasurementType('weight', 'kg', 'Kilograms');
  static readonly BODYFAT = new MeasurementType('bodyfat', '%', 'Percentage');

  constructor(
    public readonly name: string,
    public readonly unitSymbol: string,
    public readonly unit: string
  ) {}

  static from(name: string): MeasurementType {
    switch (name.toLowerCase()) {
      case 'weight':
        return MeasurementType.WEIGHT;
      case 'bodyfat':
        return MeasurementType.BODYFAT;
    }
  }

  get capitalizedName(): string {
    return this.name[0].toUpperCase() + this.name.slice(1);
  }
}
