interface IAppError {
  message: string;
  httpCode: number;
}

export class AppError extends Error implements IAppError {
  public readonly httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
