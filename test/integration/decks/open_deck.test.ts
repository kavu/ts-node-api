import { randomUUID } from 'crypto';
import { Connection } from 'typeorm';

import App from '../../../src/app/app';
import { startApp } from '../../../src/app/startApp';
import { CardRank, CardSuit, DeckType } from '../../../src/entity';
import { createDeck, openDeck } from '../../helpers/apiClient';

describe('Open Deck', () => {
  let app: App;
  let connection: Connection;

  beforeAll(async () => {
    ({app, connection } = await startApp());
  });

  afterAll(async () => {
    await connection.close();
    app.stop();
  });

  describe('opens Deck properly when', () => {
    it('is Short Deck', async () => {
      const { deckId } = await createDeck(app, 201, { type: DeckType.Short, shuffled: false });
      expect(deckId).not.toBeUndefined();

      const { type, shuffled, remaining, cards } = await openDeck(app, 200, deckId);

      expect(type).toEqual(DeckType.Short);
      expect(shuffled).toBeFalsy();
      expect(deckId).toEqual(deckId);
      expect(remaining).toEqual(36);

      expect(cards).toHaveLength(36);
      expect(cards[0].code).toEqual('6S');
      expect(cards[0].suit).toEqual(CardSuit.Spades);
      expect(cards[0].value).toEqual(CardRank.Six);
    });

    it('is Full Deck', async () => {
      const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: false });
      expect(deckId).not.toBeUndefined();

      const { type, shuffled, remaining, cards } = await openDeck(app, 200, deckId);

      expect(type).toEqual(DeckType.Full);
      expect(shuffled).toBeFalsy();
      expect(deckId).toEqual(deckId);
      expect(remaining).toEqual(52);

      expect(cards).toHaveLength(52);
      expect(cards[0].code).toEqual('6S');
      expect(cards[0].suit).toEqual(CardSuit.Spades);
      expect(cards[0].value).toEqual(CardRank.Six);
    });

    it('is Shuffled Deck', async () => {
      const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: true });
      expect(deckId).not.toBeUndefined();

      const { type, shuffled, remaining, cards } = await openDeck(app, 200, deckId);

      expect(type).toEqual(DeckType.Full);
      expect(shuffled).toBeTruthy();
      expect(deckId).toEqual(deckId);
      expect(remaining).toEqual(52);
      expect(cards).toHaveLength(52);

      const cardCodes = cards.slice(0, 4).map(c => c.code);
      expect(cardCodes).not.toEqual(['6S', '6C', '6D', '6H']);
    });
  });

  describe('returns error when', () => {
    it('deckId is invalid', async () => {
      const { error } = await openDeck(app, 422, 'something');

      expect(error).toMatch('invalid');
    });

    it('deck is not found', async () => {
      const { error } = await openDeck(app, 404, randomUUID());

      expect(error).toMatch('not found');
    });
  });
});
