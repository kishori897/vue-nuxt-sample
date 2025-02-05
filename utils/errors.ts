// ClientError should be returned for 400-451 errors
export class ClientError extends Error {
  public statusCode: number

  constructor(statusCode = 400, message = "Client error") {
    super(message)
    this.statusCode = statusCode
    this.name = "ClientError"
  }
}

// ServerError should be returned for 500-511 errors
export class ServerError extends Error {
  public statusCode: number

  constructor(statusCode = 500, message = "Internal server error") {
    super(message)
    this.statusCode = statusCode
    this.name = "InternalServerError"
  }
}
