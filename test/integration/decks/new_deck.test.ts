import { Connection } from 'typeorm';

import App from '../../../src/app/app';
import { startApp } from '../../../src/app/startApp';
import { DeckType } from '../../../src/entity';
import { createDeck } from '../../helpers/apiClient';

describe('New Deck', () => {
  let app: App;
  let connection: Connection;

  beforeAll(async () => {
    ({app, connection } = await startApp());
  });

  afterAll(async () => {
    await connection.close();
    app.stop();
  });

  describe('creates Deck properly when', () => {
    const expectedCode = 201;

    it('Short Deck', async () => {
      const response = await createDeck(app, expectedCode, {
        shuffled: true,
        type: DeckType.Short,
      });

      expect(response.type).toEqual(DeckType.Short);
      expect(response.shuffled).toBeTruthy();
      expect(response.deckId).not.toBeUndefined();
      expect(response.remaining).toEqual(36);
    });

    it('Full Deck', async () => {
      const response = await createDeck(app, expectedCode, {
        shuffled: true,
        type: DeckType.Full,
      });

      expect(response.type).toEqual(DeckType.Full);
      expect(response.shuffled).toBeTruthy();
      expect(response.deckId).not.toBeUndefined();
      expect(response.remaining).toEqual(52);
    });

    it('Unshuffled Deck', async () => {
      const response = await createDeck(app, expectedCode, {
        shuffled: false,
        type: DeckType.Full,
      });

      expect(response.type).toEqual(DeckType.Full);
      expect(response.shuffled).toBeFalsy();
      expect(response.deckId).not.toBeUndefined();
      expect(response.remaining).toEqual(52);
    });
  });

  describe('returns error when', () => {
    const expectedCode = 422;

    it('"shuffled" is missing', async () => {
      const response = await createDeck(app, expectedCode, {
        type: DeckType.Full,
      });

      expect(response.type).toBeUndefined();
      expect(response.shuffled).toBeUndefined();
      expect(response.deckId).toBeUndefined();
      expect(response.remaining).toBeUndefined();

      expect(response.error).toMatch('missing');
    });

    it('"shuffled" has invalid value', async () => {
      const response = await createDeck(app, expectedCode, {
        shuffled: 'SOMETHING',
        type: DeckType.Full,
      });

      expect(response.type).toBeUndefined();
      expect(response.shuffled).toBeUndefined();
      expect(response.deckId).toBeUndefined();
      expect(response.remaining).toBeUndefined();

      expect(response.error).toMatch('invalid');
    });

    it('"type" is missing', async () => {
      const response = await createDeck(app, expectedCode, {
        shuffled: false,
      });

      expect(response.type).toBeUndefined();
      expect(response.shuffled).toBeUndefined();
      expect(response.deckId).toBeUndefined();
      expect(response.remaining).toBeUndefined();

      expect(response.error).toMatch('missing');
    });

    it('"type" has invalid value', async () => {
      const response = await createDeck(app, expectedCode, {
        shuffled: false,
        type: 'SOMETHING',
      });

      expect(response.type).toBeUndefined();
      expect(response.shuffled).toBeUndefined();
      expect(response.deckId).toBeUndefined();
      expect(response.remaining).toBeUndefined();

      expect(response.error).toMatch('invalid');
    });
  });
});
