import * as sqlite3 from 'sqlite3';

sqlite3.verbose();

export class Database {
  private db: sqlite3.Database;

  constructor() {
    this.connect();
  }

  connect() {
    this.db = new sqlite3.Database('database.db');
  }

  getHello() {
    return 'Hello';
  }
}
