import * as sqlite3 from 'sqlite3';

sqlite3.verbose();

export class Seed {
  private db: any;

  constructor() {
    this.db = new sqlite3.Database('database.db', err => {
      if (err) {
        return console.error(err.message);
      }

      console.log('[SQLite] seeds.');
    });
  }

  public async init(): Promise<Seed> {
    return new Promise<Seed>((resolve, reject) => {
      this.db.run(`  
        CREATE TABLE IF NOT EXISTS hello (
          hello_id integer NOT NULL CONSTRAINT hello_pk PRIMARY KEY AUTOINCREMENT,
          value varchar(50) NOT NULL
        )`);

      return resolve(this);
    });
  }

  public async stop(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.db) {
        this.db.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(false);
      }
    });
  }
}