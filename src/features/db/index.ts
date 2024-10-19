import mysql from "mysql2/promise";

export class Database {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.NEXT_PUBLIC_HOST_DB,
      user: process.env.NEXT_PUBLIC_USER_DB,
      password: process.env.NEXT_PUBLIC_PASSWORD_DB,
      database: process.env.NEXT_PUBLIC_DATABASE_DB,
      port: parseInt(process.env.NEXT_PUBLIC_PORT_DB as any),
    });
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const connection = await this.pool.getConnection();
    try {
      const [rows, fields] = await connection.execute(sql, params);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export const db = new Database();
