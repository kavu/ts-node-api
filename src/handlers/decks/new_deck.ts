import { BaseHandler, IHandler, Next, TypedRequest, TypedResponse } from '../';
import { DeckType } from '../../entity';
import { NewDeckInput } from '../../validators/decks';

export class Response {
  public type: DeckType;
  public shuffled: boolean;
  public deckId: string;
  public remaining: number;

  constructor({ type, shuffled, deckId, remaining }: any) {
    // FIXME: think about removing any
    this.type = type;
    this.shuffled = shuffled;
    this.deckId = deckId;
    this.remaining = remaining;
  }
}

export class NewDeckHandlerBuilder extends BaseHandler {
  public build(): IHandler {
    return this._handler.bind(this);
  }

  private async _handler(
    req: TypedRequest<NewDeckInput, unknown>,
    res: TypedResponse<Response>,
    next: Next
  ): Promise<void> {
    try {
      const validationResult = this._validator(req.params, req.query, req.body).validate();
      if (validationResult !== undefined) {
        throw validationResult;
      }

      const { shuffled, type } = req.body;

      const result = await this._service.execute({ shuffled, type });
      const resp = new Response(result);
      res.status(201).json(resp);
    } catch (error) {
      next(error);
    }
  }
}
