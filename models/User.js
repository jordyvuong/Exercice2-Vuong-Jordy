const { sql } = require('../config/postgres');
const bcrypt = require('bcryptjs');

class User {
  static async findAll() {
    return await sql`SELECT id, username, email, created_at FROM users ORDER BY created_at DESC`;
  }

  static async findById(id) {
    const result = await sql`SELECT id, username, email, created_at FROM users WHERE id = ${id}`;
    return result[0];
  }

  static async findByEmail(email) {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return result[0];
  }

  static async findByUsername(username) {
    const result = await sql`SELECT * FROM users WHERE username = ${username}`;
    return result[0];
  }

  static async create(username, email, password) {
    // Hash le mot de passe avec bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email, created_at
    `;
    return result[0];
  }

  static async comparePassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  static async delete(id) {
    const result = await sql`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id, username, email
    `;
    return result[0];
  }

  static async update(id, data) {
    const { username, email } = data;
    const result = await sql`
      UPDATE users
      SET
        username = COALESCE(${username}, username),
        email = COALESCE(${email}, email)
      WHERE id = ${id}
      RETURNING id, username, email, created_at
    `;
    return result[0];
  }
}

module.exports = User;
