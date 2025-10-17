const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'exercice2',
  username: process.env.PG_USER || process.env.USER,
  password: process.env.PG_PASSWORD || '',
});

// Test connection
const connectDB = async () => {
  try {
    await sql`SELECT 1`;
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('PostgreSQL connection error:', error.message);
    process.exit(1);
  }
};

// Close connection on terminal (ctrl+c)
process.on('SIGINT', async () => {
  await sql.end();
  console.log('PostgreSQL connection closed');
  process.exit(0);
});

module.exports = { sql, connectDB };
