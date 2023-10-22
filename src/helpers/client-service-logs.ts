export abstract class BaseException extends Error {
  code: number;
  constructor() {
    super();
    this.code = 500;
  }
}

export class ClientAlreadyExistsException extends BaseException {
  constructor(message: string = 'Client already exists') {
    super();
    this.message = message;
    this.code = 400;
  }
}

export class QueryLimitExceedsException extends BaseException {
  constructor(message: string = 'The limit exceeded the maximum allowed') {
    super();
    this.message = message;
    this.code = 400;
  }
}

export class QueryParamsWrongException extends BaseException {
  constructor(message: string = 'You must pass limit and offset in query') {
    super();
    this.message = message;
    this.code = 400;
  }
}

export class IdIsNullException extends BaseException {
  constructor(message: string = 'You must pass a valid id') {
    super();
    this.message = message;
    this.code = 400;
  }
}

export class ClientNotFoundException extends BaseException {
  constructor(message: string = 'Client with this id is not found') {
    super();
    this.message = message;
    this.code = 404;
  }
}
