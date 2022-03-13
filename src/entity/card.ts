import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CardRank, CardSuit, DeckType, ICard } from '.';

@Entity()
export class Card implements ICard {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public suit: CardSuit;

  @Column()
  public rank: CardRank;

  @Column('text', { name: 'deck_list', array: true })
  public deckList: DeckType[];

  constructor(suit: CardSuit, rank: CardRank, list: DeckType[]) {
    this.suit = suit;
    this.rank = rank;
    this.deckList = list;
  }
}
