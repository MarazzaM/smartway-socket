// database.service.ts
import { Injectable } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection;

  async connect() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      port: 3310, 
      user: 'novosga_us',
      password: '123456',
      database: 'novosga_db'
    });
  }

  async fetchAtendimentos() {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const [rows, fields] = await this.connection.execute('SELECT * FROM atendimentos');
      return rows;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error so that it can be handled by the caller
    }
  }
}
