import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ICard, Card, DeckType } from '.';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  public uuid!: string;

  @Column()
  public type: DeckType = DeckType.Full;

  @Column({ name: 'shuffle_count' })
  // tslint:disable-next-line:no-inferrable-types
  public shuffleCount: number = 0;

  @ManyToMany(() => Card)
  @JoinTable({
    name: 'deck_cards_card',
    joinColumn: {
      name: 'deck_uuid',
      referencedColumnName: 'uuid',
    },
    inverseJoinColumn: {
      name: 'card_id',
      referencedColumnName: 'id',
    },
  })
  public cards!: ICard[];

  public isShuffled(): boolean {
    return this.shuffleCount > 0;
  }
}
