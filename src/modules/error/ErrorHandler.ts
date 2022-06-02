export class ErrorHandler {
  private readonly error: string;
  private readonly statusCode: number;

  constructor(error: string, statusCode = 400) {
    this.error = error;
    this.statusCode = statusCode;
  }
}
