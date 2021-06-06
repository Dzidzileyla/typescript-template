import { IHelloWorld } from './hello-world.interface';

import { Database } from '../db';
import { Inject } from 'typescript-ioc';

export class HelloWorldRepository implements IHelloWorld {
  private database: Database;

  constructor(@Inject database: Database) {
    this.database = database;
  }

  hello(name = 'World'): string {
    return `${this.database.getHello()}, ${name}!`;
  }
}
