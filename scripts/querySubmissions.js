import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/.env' }); // Point to backend/.env

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mk_fabrication',
  password: process.env.DB_PASSWORD || 'your_password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function querySubmissions() {
  try {
    const result = await pool.query('SELECT * FROM submissions');
    console.table(result.rows);
  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await pool.end();
  }
}

querySubmissions();