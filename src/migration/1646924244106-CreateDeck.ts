import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeck1646924244106 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS deck (
        uuid UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        type deck_type NOT NULL,
        shuffle_count INT DEFAULT 0 NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS deck_cards_card (
        deck_uuid UUID NOT NULL,
        card_id SERIAL NOT NULL,
        deck_order SERIAL NOT NULL,
        CONSTRAINT fk_deck FOREIGN KEY(deck_uuid) REFERENCES deck(uuid) ON DELETE CASCADE
      );
    `);

    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS uniq_deck_cards ON deck_cards_card (deck_uuid, card_id);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deck_cards_card');
    await queryRunner.dropTable('deck');
    await queryRunner.query(`DROP TYPE deck_type`);
  }
}
