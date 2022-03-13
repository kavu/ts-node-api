import request from 'supertest';

import App from '../../src/app/app';
import { DrawCardResponse, NewDeckResponse, OpenDeckResponse } from '../../src/handlers/decks';

type OpenDeckResponseWithPossibleError = OpenDeckResponse & { error: string };
type NewDeckResponseWithPossibleError = NewDeckResponse & { error: string };
type DrawCardResponseWithPossibleError = DrawCardResponse & { error: string };

export const createDeck = async (
  app: App,
  expectedCode: number = 201,
  params: { type?: any, shuffled?: any }
): Promise<NewDeckResponseWithPossibleError> => {
  const response = await request(app.expressApp)
    .post('/decks/new')
    .expect(expectedCode)
    .send(params);

  return response.body;
};

export const openDeck = async (
  app: App,
  expectedCode: number = 200,
  deckId: string
): Promise<OpenDeckResponseWithPossibleError> => {
  const response = await request(app.expressApp)
    .post(`/decks/${deckId}/open`)
    .expect(expectedCode)
    .send();

  return response.body;
};

export const drawCards = async (
  app: App,
  expectedCode: number = 200,
  deckId: string,
  count: number = 1
): Promise<DrawCardResponseWithPossibleError> => {
  const response = await request(app.expressApp)
    .post(`/decks/${deckId}/draw?count=${count}`)
    .expect(expectedCode)
    .send();

  return response.body;
};
