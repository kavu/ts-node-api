import { validate as isValidUUID } from 'uuid';

import { IValidator } from '../';
import { ValidationError } from '../../errors';

export interface Input {
  count: number;
}

export class DrawCardValidator implements IValidator {
  public static withParams(params: any, query: any, _body: any): DrawCardValidator {
    return new DrawCardValidator(params, query);
  }

  private readonly _count: number;
  private readonly _deckId: string;

  private constructor(params: { deckId: string }, fields: Input) {
    this._count = fields.count;
    this._deckId = params.deckId;
  }

  public validate(): ValidationError | undefined {
    if (this._deckId === undefined) {
      throw new ValidationError("'deckId' is missing");
    }

    if (!isValidUUID(this._deckId)) {
      throw new ValidationError("'deckId' is invalid");
    }

    if (this._count !== undefined && this._count < 1) {
      throw new ValidationError("'count' field is invalid");
    }

    return;
  }
}
