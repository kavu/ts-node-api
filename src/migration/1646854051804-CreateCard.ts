import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCard1646854051804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE deck_type AS ENUM ('FULL','SHORT');`);
    await queryRunner.query(
      `CREATE TYPE card_suit AS ENUM ('SPADES','CLUBS','DIAMONDS','HEARTS');`
    );
    await queryRunner.query(
      `CREATE TYPE card_rank AS ENUM ('ACE','2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING');`
    );
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS card (
        id SERIAL PRIMARY KEY NOT NULL,
        suit card_suit NOT NULL,
        rank card_rank NOT NULL,
        deck_list deck_type[] NOT NULL,
        CONSTRAINT uniq_card UNIQUE (suit, rank)
      );
    `);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS card_deck_type ON card (deck_list);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card');
    await queryRunner.query(`DROP TYPE card_suit`);
    await queryRunner.query(`DROP TYPE card_rank`);
  }
}
