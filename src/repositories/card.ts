import { Repository } from 'typeorm';

import { Card, DeckType } from '../entity';

export interface ICardsRepository {
  findCardsByDeckList(type: DeckType): Promise<Card[]>;
}

export class CardsRepository implements ICardsRepository {
  private readonly _repository: Repository<Card>;

  constructor(repository: Repository<Card>) {
    this._repository = repository;
  }

  public findCardsByDeckList(type: DeckType): Promise<Card[]> {
    return this._repository
      .createQueryBuilder()
      .where(':type = ANY(deck_list)', { type })
      .getMany();
  }
}
