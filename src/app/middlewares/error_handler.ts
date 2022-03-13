import { NextFunction, Request, Response } from 'express';

import { ValidationError, NotFoundError } from '../../errors';

export function ErrorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);

  if (err instanceof ValidationError) {
    res.status(422).send({ error: err.message });
    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).send({ error: err.message });
    return;
  }

  res.status(500).send({ error: err.message });
}
