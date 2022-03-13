import { BaseService, IService } from '../';
import { NotFoundError } from '../../errors';
import { CardDecorator, DecoratedCard } from '../../libs';

export interface Input {
  count: number;
  deckId: string;
}

export interface Output {
  cards: DecoratedCard[];
}

export class DrawCardService extends BaseService implements IService {
  public async execute(input: Input): Promise<Output> {
    const { deckId, count = 1 } = input;

    const deckRepository = await this.repositoriesProvider.getDecksRepository();

    const deck = await deckRepository.getDeckByUUID(deckId);
    if (deck === undefined) {
      throw new NotFoundError('Deck not found');
    }

    const cards = deck.cards.splice(0, count).map(CardDecorator.decorate);

    await deckRepository.save(deck);

    return { cards };
  }
}
