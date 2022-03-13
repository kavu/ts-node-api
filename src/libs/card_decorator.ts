import { CardRank, ICard } from '../entity';

export type DecoratedCard = {
  value: string;
  suit: string;
  code: string;
};

export class CardDecorator {
  public static decorate(card: ICard): DecoratedCard {
    const { suit, rank } = card;
    let code = '';

    if (card.rank === CardRank.Ten) {
      code = card.rank;
    } else {
      code = card.rank[0];
    }
    code = code.concat(card.suit[0]);

    const decoratedCard: DecoratedCard = {
      code,
      suit,
      value: rank,
    };

    return decoratedCard;
  }
}
