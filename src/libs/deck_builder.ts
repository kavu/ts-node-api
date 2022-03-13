import { Deck, DeckType, ICard } from '../entity';

export class DeckBuilder {
  private _deck: Deck;
  private _shuffle = false;

  constructor() {
    this._deck = new Deck();
  }

  public type(type: DeckType): DeckBuilder {
    this._deck.type = type;
    this._deck.cards = [];

    return this;
  }

  public cards(cards: ICard[]): DeckBuilder {
    this._deck.cards = cards;

    return this;
  }

  public shuffle(shuffle: boolean): DeckBuilder {
    this._shuffle = shuffle;

    return this;
  }

  public build(): Deck {
    if (this._shuffle) {
      this._deck.shuffleCount++;
      this._deck.cards.sort(() => Math.random() - 0.5);
    }

    return this._deck;
  }
}
