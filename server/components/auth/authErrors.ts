export interface IAuthError {
  message: string;
  httpCode: number;
}

export class AuthError extends Error implements IAuthError {
  public readonly httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
