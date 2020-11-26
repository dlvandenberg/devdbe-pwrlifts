import { QuarterDecimalPipe } from './quarter-decimal.pipe';

describe('QuarterDecimalPipe', () => {

  it('create an instance', () => {
    const pipe = new QuarterDecimalPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format 10.2 to 10.0', () => {
    const pipe = new QuarterDecimalPipe();
    // Given
    const value = 10.2;

    // When
    const result = pipe.transform(value);

    // Then
    expect(result).toEqual(10);
  });

  it('should format 10.28 to 10.25', () => {
    const pipe = new QuarterDecimalPipe();
    // Given
    const value = 10.28;

    // When
    const result = pipe.transform(value);

    // Then
    expect(result).toEqual(10.25);
  });

  it('should format 10.6451 to 10.5', () => {
    const pipe = new QuarterDecimalPipe();
    // Given
    const value = 10.6451;

    // When
    const result = pipe.transform(value);

    // Then
    expect(result).toEqual(10.5);
  });

  it('should format 10.82 to 10.75', () => {
    const pipe = new QuarterDecimalPipe();
    // Given
    const value = 10.82;

    // When
    const result = pipe.transform(value);

    // Then
    expect(result).toEqual(10.75);
  });

  it('should return null when value is not a number', () => {
    const pipe = new QuarterDecimalPipe();
    // Given
    const value = '10.2';

    // When
    const result = pipe.transform(value);

    // Then
    expect(result).toBeFalsy();
  });
});
