import { DeckBuilder } from '../';
import { CardRank, CardSuit, DeckType, ICard } from '../../entity';
import { enumKeys } from '../../helpers';

describe(DeckBuilder, () => {
  describe('#build', () => {
    let cards: ICard[] = [];

    beforeEach(() => {
      cards = enumKeys(CardRank).map((rank) => {
        return {
          suit: CardSuit.Spades,
          rank: CardRank[rank],
          deckList: [],
        };
      });
    });

    it('returns proper unshuffled Deck', () => {
      const deck = new DeckBuilder().type(DeckType.Full).shuffle(false).cards(cards).build();

      expect(deck.uuid).toBeUndefined();
      expect(deck.type).toEqual(DeckType.Full);
      expect(deck.isShuffled()).toBeFalsy();
      expect(deck.shuffleCount).toEqual(0);

      expect(deck.cards).toEqual(cards);
    });

    it('returns proper shuffled Deck', () => {
      const deck = new DeckBuilder()
        .type(DeckType.Full)
        .shuffle(true)
        .cards(JSON.parse(JSON.stringify(cards))) // clone array
        .build();

      expect(deck.uuid).toBeUndefined();
      expect(deck.type).toEqual(DeckType.Full);
      expect(deck.isShuffled()).toBeTruthy();
      expect(deck.shuffleCount).toEqual(1);

      expect(deck.cards).not.toEqual(cards);
    });
  });
});
