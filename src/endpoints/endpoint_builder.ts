import { IHandler } from '../handlers';
import { Endpoint, IEndpoint, Method, Route } from './endpoint';

export class EndpointBuilder {
  private readonly _endpoint: IEndpoint;

  constructor() {
    this._endpoint = new Endpoint();
  }

  public method(method: Method): EndpointBuilder {
    this._endpoint.method = method;
    return this;
  }

  public path(path: Route): EndpointBuilder {
    this._endpoint.path = path;
    return this;
  }

  public handleWith(handler: IHandler): EndpointBuilder {
    this._endpoint.handler = handler;
    return this;
  }

  public build(): IEndpoint {
    return this._endpoint;
  }
}
