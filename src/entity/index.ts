export { Card } from './card';
export { Deck } from './deck';

export enum DeckType {
  Short = 'SHORT',
  Full = 'FULL',
}

export enum CardSuit {
  Spades = 'SPADES',
  Clubs = 'CLUBS',
  Dimonds = 'DIAMONDS',
  Hearts = 'HEARTS',
}

export enum CardRank {
  Ace = 'ACE',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'JACK',
  Queen = 'QUEEN',
  King = 'KING',
}

export interface ICard {
  suit: CardSuit;
  rank: CardRank;
  deckList: DeckType[];
}

export const ShortDeckRanksList = [
  CardRank.Six,
  CardRank.Seven,
  CardRank.Eight,
  CardRank.Nine,
  CardRank.Ten,
  CardRank.Jack,
  CardRank.Queen,
  CardRank.King,
  CardRank.Ace,
];

export const FullDeckRanksList = ShortDeckRanksList.concat([
  CardRank.Two,
  CardRank.Three,
  CardRank.Four,
  CardRank.Five,
]);
