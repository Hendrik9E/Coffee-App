import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: SQLiteObject;

  constructor(private sqlite: SQLite) {}

  async initDatabase() {
    try {
      const db = await this.sqlite.create({
        name: 'CoffeeStock.db',
        location: 'default'
      });

      this.db = db;

      const createFlavoursTable = `
        CREATE TABLE IF NOT EXISTS Flavours (
          ID INTEGER PRIMARY KEY AUTOINCREMENT,
          Barcode TEXT,
          Name TEXT,
          PricePerBox REAL,
          PricePerPod REAL,
          PodsPerBox INTEGER,
          PhotoName TEXT
        );
      `;

      await this.db.executeSql(createFlavoursTable, []);
      console.log('[SQLite] Flavours table created successfully.');
    } catch (error) {
      console.error('[SQLite] Error setting up database:', error);
    }
  }
}
