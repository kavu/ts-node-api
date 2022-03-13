import { validate as isValidUUID } from 'uuid';

import { IValidator } from '../';
import { ValidationError } from '../../errors';

export class OpenDeckValidator implements IValidator {
  public static withParams(params: any, _query: any, _body: any): OpenDeckValidator {
    return new OpenDeckValidator(params);
  }

  private readonly _deckId: string;

  private constructor(params: { deckId: string }) {
    this._deckId = params.deckId;
  }

  public validate(): ValidationError | undefined {
    if (this._deckId === undefined) {
      throw new ValidationError("'deckId' is missing");
    }

    if (!isValidUUID(this._deckId)) {
      throw new ValidationError("'deckId' is invalid");
    }

    return;
  }
}
