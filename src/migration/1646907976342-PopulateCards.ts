import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import { Card, CardSuit, DeckType, FullDeckRanksList, ShortDeckRanksList } from '../entity';
import { enumKeys } from '../helpers';

export class PopulateCards1646907976342 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const cards: Card[] = [];
    const shortDeckList = [DeckType.Short, DeckType.Full];
    const fullDeckList = [DeckType.Full];

    FullDeckRanksList.forEach((rank) => {
      const type = !ShortDeckRanksList.includes(rank) ? fullDeckList : shortDeckList;

      for (const suit of enumKeys(CardSuit)) {
        const card = new Card(CardSuit[suit], rank, type);

        cards.push(card);
      }
    });

    getRepository(Card).insert(cards);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.clearTable('card');
  }
}
