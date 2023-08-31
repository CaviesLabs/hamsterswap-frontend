import Decimal from "decimal.js";

/**
 * @notice AppNumber instance represents logic handler for all numbers in the app
 * @private value - represents the value of the number
 * @public getValue() - returns the value of the number
 * @public add(value) - adds the value to the number
 * @public subtract(value) - subtracts the value from the number
 * @public multiply(value) - multiplies the number by the value
 * @public divide(value) - divides the number by the value
 * @public pow(value) - raises the number to the power of the value
 * @public toNumber() - returns the number as a number
 * @public getDisplayedString() - returns the number as a string
 */
export class AppNumber {
  /**
   * @dev value - represents the value of the number
   * @private
   */
  private readonly value: Decimal;

  /**
   * @notice constructors initializes AppNumber instance
   * @param value
   */
  constructor(value: number) {
    this.value = new Decimal(value);
  }

  /**
   * @notice getValue() - returns the value of the number
   */
  public getValue(): Decimal {
    return this.value;
  }

  /**
   * @notice add(value) - adds the value to the number
   * @param value
   */
  public add(value: AppNumber) {
    return new AppNumber(
      this.value.plus(value.getValue().toNumber()).toNumber()
    );
  }

  /**
   * @notice subtract(value) - subtracts the value from the number
   * @param value
   */
  public subtract(value: AppNumber) {
    return new AppNumber(
      this.value.minus(value.getValue().toNumber()).toNumber()
    );
  }

  /**
   * @notice multiply(value) - multiplies the number by the value
   * @param value
   */
  public multiply(value: AppNumber) {
    return new AppNumber(
      this.value.times(value.getValue().toNumber()).toNumber()
    );
  }

  /**
   * @notice divide(value) - divides the number by the value
   * @param value
   */
  public divide(value: AppNumber) {
    return new AppNumber(
      this.value.dividedBy(value.getValue().toNumber()).toNumber()
    );
  }

  /**
   * @notice pow(value) - raises the number to the power of the value
   * @param value
   */
  public pow(value: AppNumber) {
    return new AppNumber(
      this.value.pow(value.getValue().toNumber()).toNumber()
    );
  }

  /**
   * @notice toNumber() - returns the number as a number
   */
  public toNumber() {
    return this.value.toNumber();
  }
}
