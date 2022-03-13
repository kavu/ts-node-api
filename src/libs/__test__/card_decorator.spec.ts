import { CardDecorator } from '../';
import { Card, CardRank, CardSuit, DeckType } from '../../entity';

describe(CardDecorator, () => {
  describe('#decorate', () => {
    it('returns proper DecoratedCard with one digit Rank', () => {
      const card = new Card(CardSuit.Clubs, CardRank.Nine, [DeckType.Full]);
      const decoratedCard = CardDecorator.decorate(card);

      expect(decoratedCard.suit).toStrictEqual(CardSuit.Clubs);
      expect(decoratedCard.value).toStrictEqual(CardRank.Nine);
      expect(decoratedCard.code).toStrictEqual('9C');
    });

    it('returns proper DecoratedCard with two digit Rank', () => {
      const card = new Card(CardSuit.Clubs, CardRank.Ten, [DeckType.Full]);
      const decoratedCard = CardDecorator.decorate(card);

      expect(decoratedCard.suit).toStrictEqual(CardSuit.Clubs);
      expect(decoratedCard.value).toStrictEqual(CardRank.Ten);
      expect(decoratedCard.code).toStrictEqual('10C');
    });

    it('returns proper DecoratedCard with named Rank', () => {
      const card = new Card(CardSuit.Spades, CardRank.Ace, [DeckType.Full]);
      const decoratedCard = CardDecorator.decorate(card);

      expect(decoratedCard.suit).toStrictEqual(CardSuit.Spades);
      expect(decoratedCard.value).toStrictEqual(CardRank.Ace);
      expect(decoratedCard.code).toStrictEqual('AS');
    });
  });
});
