import { IHandler } from '../handlers';

export enum Method {
  GET = 'get',
  POST = 'post',
}

export type Route = string;

export interface IEndpoint {
  method: Method;
  path: Route;
  handler: IHandler;
}

export class Endpoint implements IEndpoint {
  private _method!: Method;
  private _path!: Route;
  private _handler!: IHandler;

  get method(): Method {
    return this._method;
  }

  set method(method: Method) {
    this._method = method;
  }

  get path(): Route {
    return this._path;
  }

  set path(path: Route) {
    this._path = path;
  }

  get handler(): IHandler {
    return this._handler;
  }

  set handler(handler: IHandler) {
    this._handler = handler;
  }
}
