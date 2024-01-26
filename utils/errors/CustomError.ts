export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
