import { BaseHandler, IHandler, Next, TypedRequest, TypedResponse } from '../';
import { Card } from '../../entity';
import { DrawCardInput } from '../../validators/decks';

export class Response {
  public cards: Card[];

  constructor({ cards }: any) {
    this.cards = cards;
  }
}

export class DrawCardHandlerBuilder extends BaseHandler {
  public build(): IHandler {
    return this._handler.bind(this);
  }

  private async _handler(
    req: TypedRequest<unknown, DrawCardInput>,
    res: TypedResponse<Response>,
    next: Next
  ): Promise<void> {
    try {
      const validationResult = this._validator(req.params, req.query, req.body).validate();
      if (validationResult !== undefined) {
        throw validationResult;
      }

      const { deckId } = req.params as { deckId: string };
      const { count } = req.query;

      const result = await this._service.execute({ deckId, count });
      const resp = new Response(result);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
}
