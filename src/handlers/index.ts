import { NextFunction, Params, Send } from 'express-serve-static-core';

import { IService } from '../service';
import { ValidatorConstructor } from '../validators';

export interface TypedRequest<B, Q> extends Express.Request {
  body: B;
  query: Q;
  params: Params;
}

export interface TypedResponse<B, S = number> extends Express.Response {
  json: Send<B, this>;
  status(code: S): this;
}

export type Next = NextFunction;

export type IHandler = (
  req: TypedRequest<any, any>,
  res: TypedResponse<any>,
  next: Next
) => Promise<void>;

export interface IHandlerBuilder {
  withService(service: IService): this;
  withValidator(validator: ValidatorConstructor): this;
  build(): IHandler;
}

export abstract class BaseHandler {
  public _service!: IService;
  public _validator!: ValidatorConstructor;

  public withService(service: IService): this {
    this._service = service;
    return this;
  }

  public withValidator(validator: ValidatorConstructor): this {
    this._validator = validator;
    return this;
  }

  public build(): IHandler {
    return () => Promise.reject(Error('Not implemented!'));
  }
}
