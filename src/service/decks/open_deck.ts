import { BaseService, IService } from '../';
import { DeckType } from '../../entity';
import { NotFoundError } from '../../errors';
import { CardDecorator, DecoratedCard } from '../../libs';

export interface Input {
  deckId: string;
}

export interface Output {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
  cards: DecoratedCard[];
}

export class OpenDeckService extends BaseService implements IService {
  public async execute(input: Input): Promise<Output> {
    const { deckId } = input;

    const deckRepository = await this.repositoriesProvider.getDecksRepository();

    const deck = await deckRepository.getDeckByUUID(deckId);
    if (deck === undefined) {
      throw new NotFoundError('Deck not found');
    }

    const result: Output = {
      deckId: deck.uuid,
      type: deck.type,
      shuffled: deck.isShuffled(),
      remaining: deck.cards.length,
      cards: deck.cards.map(CardDecorator.decorate),
    };

    return result;
  }
}
