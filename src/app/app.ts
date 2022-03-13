import express from 'express';
import { Server } from 'http';

import { IEndpoint, Method } from '../endpoints';
import { AppStartedError } from '../errors';
import { ErrorHandler } from './middlewares/error_handler';

interface IApp {
  addEndpoint(endpoint: IEndpoint): void;
  start(): void;
  stop(): void;
}

export default class App implements IApp {
  private _app: express.Application;
  private _port: number;
  private _started = false;
  private _server!: Server;

  constructor(port: number = 3000) {
    this._port = port;
    this._app = express();
    this._app.use(express.json());
  }

  // Used specifically by supertest request
  get expressApp(): express.Application {
    return this._app;
  }

  public addEndpoint(endpoint: IEndpoint): void {
    if (this._started) {
      throw new AppStartedError("Can't add more handler, app has already been started!");
    }

    switch (endpoint.method) {
      case Method.GET:
        this._addGetHandler(endpoint);
        break;
      case Method.POST:
        this._addPostHandler(endpoint);
        break;
      default:
        break;
    }
  }

  public async start(): Promise<void> {
    this._started = true;
    this._app.use(ErrorHandler); // NOTE: Error Handling middleware MUST be the last
    this._server = this._app.listen(this._port);
  }

  public stop(): void {
    if (this._started) {
      this._server.close();
    }
  }

  private _addGetHandler(handler: IEndpoint): void {
    this._app.get(handler.path, handler.handler);
  }

  private _addPostHandler(handler: IEndpoint): void {
    this._app.post(handler.path, handler.handler);
  }
}
