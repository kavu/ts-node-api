import { Repository } from 'typeorm';

import { Deck } from '../entity';

export interface IDecksRepository {
  save(entity: Deck): Promise<Deck>;
  getDeckByUUID(uuid: string): Promise<Deck | undefined>;
}

export class DecksRepository implements IDecksRepository {
  private readonly _repository: Repository<Deck>;

  constructor(repository: Repository<Deck>) {
    this._repository = repository;
  }

  public async save(entity: Deck): Promise<Deck> {
    return this._repository.save(entity, { reload: true });
  }

  public getDeckByUUID(uuid: string): Promise<Deck | undefined> {
    return this._repository
      .createQueryBuilder('deck')
      .where('deck.uuid = :uuid', { uuid })
      .leftJoinAndSelect('deck.cards', 'card')
      .orderBy('deck_card.deck_order', 'ASC')
      .getOne();
  }
}
