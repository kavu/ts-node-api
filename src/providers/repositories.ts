import { Connection } from 'typeorm';

import { Card, Deck } from '../entity';
import {
  CardsRepository,
  DecksRepository,
  ICardsRepository,
  IDecksRepository,
} from '../repositories';

export interface IRepositoriesProvider {
  getDecksRepository(): Promise<IDecksRepository>;
  getCardsRepository(): Promise<ICardsRepository>;
}

export class RepositoriesProvider implements IRepositoriesProvider {
  private _connection: Connection;

  constructor(connection: Connection) {
    this._connection = connection;
  }

  public async getCardsRepository(): Promise<ICardsRepository> {
    const ormRepository = this._connection.getRepository(Card);

    return new CardsRepository(ormRepository);
  }

  public async getDecksRepository(): Promise<IDecksRepository> {
    const ormRepository = this._connection.getRepository(Deck);

    return new DecksRepository(ormRepository);
  }
}
