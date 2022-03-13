
import { randomUUID } from 'crypto';
import { Connection } from 'typeorm';

import App from '../../../src/app/app';
import { startApp } from '../../../src/app/startApp';
import { DeckType } from '../../../src/entity';
import { createDeck, drawCards, openDeck } from '../../helpers/apiClient';

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

  describe('New Deck', () => {
    describe('draws one card properly when', () => {
      it('shuffled deck', async () => {
        const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: true });
        expect(deckId).not.toBeUndefined();

        const { remaining, cards } = await openDeck(app, 200, deckId);
        expect(remaining).toEqual(52);
        const topCard = cards[0];

        const { cards: drawnCards } = await drawCards(app, 200, deckId, 1);

        expect(drawnCards).toHaveLength(1);
        expect(drawnCards[0]).toEqual(topCard);

        const { remaining: remainingAfterDraw, cards: cardsAfterDraw } = await openDeck(app, 200, deckId);
        expect(remainingAfterDraw).toEqual(51);
        expect(cardsAfterDraw[0]).not.toEqual(topCard);
      });

      it('unshuffled deck', async () => {
        const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: false });
        expect(deckId).not.toBeUndefined();

        const { remaining, cards } = await openDeck(app, 200, deckId);
        expect(remaining).toEqual(52);
        const topCard = cards[0];

        const { cards: drawnCards } = await drawCards(app, 200, deckId, 1);

        expect(drawnCards).toHaveLength(1);
        expect(drawnCards[0]).toEqual(topCard);

        const { remaining: remainingAfterDraw, cards: cardsAfterDraw } = await openDeck(app, 200, deckId);
        expect(remainingAfterDraw).toEqual(51);
        expect(cardsAfterDraw[0]).not.toEqual(topCard);
      });
    });

    it('draws several card properly', async () => {
      const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: false });
      expect(deckId).not.toBeUndefined();

      const { remaining, cards } = await openDeck(app, 200, deckId);
      expect(remaining).toEqual(52);
      const topCards = cards.slice(0, 10);

      const { cards: drawnCards } = await drawCards(app, 200, deckId, 10);

      expect(drawnCards).toHaveLength(10);
      expect(drawnCards.slice(0, 10)).toEqual(topCards);

      const { remaining: remainingAfterDraw, cards: cardsAfterDraw } = await openDeck(app, 200, deckId);
      expect(remainingAfterDraw).toEqual(42);
      expect(cardsAfterDraw.slice(0, 10)).not.toEqual(topCards);
    });

    it('draws all card properly', async () => {
      const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: false });
      expect(deckId).not.toBeUndefined();

      const { remaining, cards } = await openDeck(app, 200, deckId);
      expect(remaining).toEqual(52);

      const { cards: drawnCards } = await drawCards(app, 200, deckId, 1000);

      expect(drawnCards).toHaveLength(52);
      expect(drawnCards).toEqual(cards);

      const { remaining: remainingAfterDraw, cards: cardsAfterDraw } = await openDeck(app, 200, deckId);
      expect(remainingAfterDraw).toEqual(0);
      expect(cardsAfterDraw).toEqual([]);
    });

    describe('returns error when', () => {
      it('deckId is invalid', async () => {
        const { error } = await drawCards(app, 422, 'something');

        expect(error).toMatch('invalid');
      });

      it('count is invalid', async () => {
        const { deckId } = await createDeck(app, 201, { type: DeckType.Full, shuffled: false });
        expect(deckId).not.toBeUndefined();

        const { error } = await drawCards(app, 422, deckId, -100);

        expect(error).toMatch('invalid');
      });

      it('deck is not found', async () => {
        const { error } = await drawCards(app, 404, randomUUID(), 100);

        expect(error).toMatch('not found');
      });
    });
  });
});
