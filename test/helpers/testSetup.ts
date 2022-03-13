import { createConnection, MigrationInterface } from 'typeorm';

import { Card, Deck } from '../../src/entity';
import { PopulateCards1646907976342 } from '../../src/migration/1646907976342-PopulateCards';

export default async () => {
  const connection = await createConnection({
    applicationName: 'testSetup',
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'cards_api',
    entities: [Deck, Card],
    logging: false,
  });

  const cardsMigration: MigrationInterface = new PopulateCards1646907976342();
  const queryRunner = connection.createQueryRunner();

  queryRunner.clearTable('deck');
  queryRunner.clearTable('deck_cards_card');
  queryRunner.clearTable('card');

  await cardsMigration.up(queryRunner);
  await connection.close();
};
