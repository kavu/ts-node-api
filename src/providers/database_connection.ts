import { Connection, createConnection } from 'typeorm';

import { Card, Deck } from '../entity';

interface IDatabaseConnectionProvider {
  getConnection(): Promise<Connection>;
  closeConnection(): Promise<void>;
}

export class DatabaseConnectionProvider implements IDatabaseConnectionProvider {
  private _connection: Promise<Connection>;

  constructor() {
    this._connection = createConnection({
      applicationName: 'cards-api',
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'cards_api',
      entities: [Deck, Card],
      logging: false,
    });
  }

  public async getConnection(): Promise<Connection> {
    return this._connection;
  }

  public async closeConnection(): Promise<void> {
    const connection = await this.getConnection();

    return connection.close();
  }
}
