import { BaseService, IService } from '../';
import { DeckType } from '../../entity';
import { DeckBuilder } from '../../libs';

export interface Input {
  type: DeckType;
  shuffled: boolean;
}

export interface Output {
  type: DeckType;
  shuffled: boolean;
  deckId: string;
  remaining: number;
}

export class NewDeckService extends BaseService implements IService {
  public async execute(input: Input): Promise<Output> {
    const { type, shuffled = false } = input;

    const cardRepository = await this.repositoriesProvider.getCardsRepository();
    const cards = await cardRepository.findCardsByDeckList(type);

    const deck = new DeckBuilder().type(type).cards(cards).shuffle(shuffled).build();

    const deckRepository = await this.repositoriesProvider.getDecksRepository();
    await deckRepository.save(deck);

    const result: Output = {
      deckId: deck.uuid,
      remaining: deck.cards.length,
      shuffled: deck.isShuffled(),
      type: deck.type,
    };

    return result;
  }
}
