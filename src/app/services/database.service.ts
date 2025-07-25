import { Injectable, Optional } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Flavour } from '../models/flavour.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: SQLiteObject;
  private isBrowser = false;
  private mockFlavours: Flavour[] = [];

  constructor(@Optional() private sqlite: SQLite, private platform: Platform) {
    this.isBrowser = !this.platform.is('cordova');
  }

  async initDatabase() {
    if (this.isBrowser) {
      console.log('[Mock DB] Running in browser - using in-memory storage');
      return;
    }

    if (!this.sqlite) {
      console.warn('[SQLite] Plugin not available in browser!');
      return;
    }

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

  async addFlavour(flavour: Flavour) {
    if (this.isBrowser || !this.sqlite) {
      flavour['id'] = this.mockFlavours.length + 1;
      this.mockFlavours.push(flavour);
      console.log('[Mock DB] Added flavour:', flavour);
      return;
    }

    const sql = `
      INSERT INTO Flavours (Barcode, Name, PricePerBox, PricePerPod, PodsPerBox, PhotoName)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      flavour.barcode,
      flavour.name,
      flavour.pricePerBox,
      flavour.pricePerPod,
      flavour.podsPerBox,
      flavour.photoName
    ];

    return this.db.executeSql(sql, params);
  }

  async getAllFlavours(): Promise<Flavour[]> {
    if (this.isBrowser || !this.sqlite) {
      return this.mockFlavours;
    }

    const res = await this.db.executeSql(`SELECT * FROM Flavours`, []);
    const flavours: Flavour[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      flavours.push(res.rows.item(i));
    }
    return flavours;
  }

  async updateFlavour(id: number, flavour: Flavour) {
    if (this.isBrowser || !this.sqlite) {
      const index = this.mockFlavours.findIndex((f) => f['id'] === id);
      if (index > -1) {
        this.mockFlavours[index] = { ...flavour, id: id };
      }
      return;
    }

    const sql = `
      UPDATE Flavours SET
        Barcode = ?, Name = ?, PricePerBox = ?, PricePerPod = ?, PodsPerBox = ?, PhotoName = ?
      WHERE ID = ?
    `;
    const params = [
      flavour.barcode,
      flavour.name,
      flavour.pricePerBox,
      flavour.pricePerPod,
      flavour.podsPerBox,
      flavour.photoName,
      id
    ];

    return this.db.executeSql(sql, params);
  }

  async deleteFlavour(id: number) {
    if (this.isBrowser || !this.sqlite) {
      this.mockFlavours = this.mockFlavours.filter((f) => f['id'] !== id);
      return;
    }

    return this.db.executeSql(`DELETE FROM Flavours WHERE ID = ?`, [id]);
  }
}
