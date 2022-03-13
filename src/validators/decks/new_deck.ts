import { IValidator } from '../';
import { DeckType } from '../../entity';
import { ValidationError } from '../../errors';

export interface Input {
  type: DeckType;
  shuffled: boolean;
}

export class NewDeckValidator implements IValidator {
  public static withParams(_params: any, _query: any, body: any): NewDeckValidator {
    return new NewDeckValidator(body);
  }

  private readonly _type: DeckType;
  private readonly _shuffled: boolean;

  private constructor(fields: Input) {
    this._type = fields.type;
    this._shuffled = fields.shuffled;
  }

  public validate(): ValidationError | undefined {
    if (this._shuffled === undefined) {
      return new ValidationError("'shuffled' field is missing");
    }

    if (this._type === undefined) {
      return new ValidationError("'type' field is missing");
    }

    if (typeof this._shuffled !== 'boolean') {
      return new ValidationError(`'shuffled' is invalid - only 'true' and 'false' are allowed`);
    }

    if (this._type !== DeckType.Full && this._type !== DeckType.Short) {
      return new ValidationError(
        `type' is invalid - only '${DeckType.Full}' and '${DeckType.Short}' are allowed`
      );
    }

    return;
  }
}
