import { ValidationError } from '../errors';

export interface IValidator {
  validate(): ValidationError | undefined;
}

export type ValidatorConstructor = (params: any, query: any, body: any) => IValidator;
