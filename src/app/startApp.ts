import { Connection } from 'typeorm';

import { EndpointBuilder, Method } from '../endpoints';
import {
  DrawCardHandlerBuilder,
  NewDeckHandlerBuilder,
  OpenDeckHandlerBuilder,
} from '../handlers/decks';
import { DatabaseConnectionProvider, RepositoriesProvider } from '../providers';
import { DrawCardService, NewDeckService, OpenDeckService } from '../service/decks';
import { DrawCardValidator, NewDeckValidator, OpenDeckValidator } from '../validators/decks';
import App from './app';

export const startApp = async (port: number = 0): Promise<{ app: App; connection: Connection }> => {
  const connectionProvider = new DatabaseConnectionProvider();
  const connection = await connectionProvider.getConnection();

  const repositoriesProvider = new RepositoriesProvider(connection);

  // New Deck
  const newDeckHandler = new NewDeckHandlerBuilder()
    .withService(new NewDeckService(repositoriesProvider))
    .withValidator(NewDeckValidator.withParams)
    .build();

  const decksNew = new EndpointBuilder()
    .method(Method.POST)
    .path('/decks/new')
    .handleWith(newDeckHandler)
    .build();

  // Open Deck
  const openDeckHandler = new OpenDeckHandlerBuilder()
    .withService(new OpenDeckService(repositoriesProvider))
    .withValidator(OpenDeckValidator.withParams)
    .build();

  const deckOpen = new EndpointBuilder()
    .method(Method.POST)
    .path('/decks/:deckId/open')
    .handleWith(openDeckHandler)
    .build();

  // Draw Card
  const drawCardHandler = new DrawCardHandlerBuilder()
    .withService(new DrawCardService(repositoriesProvider))
    .withValidator(DrawCardValidator.withParams)
    .build();

  const drawCard = new EndpointBuilder()
    .method(Method.POST)
    .path('/decks/:deckId/draw')
    .handleWith(drawCardHandler)
    .build();

  const app = new App(port);
  app.addEndpoint(decksNew);
  app.addEndpoint(deckOpen);
  app.addEndpoint(drawCard);
  app.start();

  return { app, connection };
};
