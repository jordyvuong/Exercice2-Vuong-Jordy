const { sql } = require('../config/postgres');

async function createUsersTable() {
  try {
    console.log('Creating users table...');

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Users table created successfully!');

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error creating users table:', error.message);
    await sql.end();
    process.exit(1);
  }
}

createUsersTable();
