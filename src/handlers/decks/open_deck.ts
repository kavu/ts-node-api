import { BaseHandler, IHandler, Next, TypedRequest, TypedResponse } from '../';
import { DeckType } from '../../entity';
import { DecoratedCard } from '../../libs';

export class Response {
  public deckId: string;
  public type: DeckType;
  public shuffled: boolean;
  public remaining: number;
  public cards: DecoratedCard[];

  constructor({ deckId, type, shuffled, cards, remaining }: any) {
    // FIXME: think about removing any
    this.deckId = deckId;
    this.type = type;
    this.shuffled = shuffled;
    this.remaining = remaining;
    this.cards = cards;
  }
}

export class OpenDeckHandlerBuilder extends BaseHandler {
  public build(): IHandler {
    return this._handler.bind(this);
  }

  private async _handler(
    req: TypedRequest<unknown, unknown>,
    res: TypedResponse<Response>,
    next: Next
  ): Promise<void> {
    try {
      const validationResult = this._validator(req.params, req.query, req.body).validate();
      if (validationResult !== undefined) {
        throw validationResult;
      }

      const { deckId } = req.params as { deckId: string };

      const result = await this._service.execute({ deckId });
      const resp = new Response(result);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
}
