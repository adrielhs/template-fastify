export class AppError {
  public readonly message: string

  public readonly statusCode: number

  constructor(message: string, status = 400) {
    this.message = message
    this.statusCode = status
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}
