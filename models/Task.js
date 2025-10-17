const { sql } = require('../config/postgres');

class Task {
  static async findAll() {
    return await sql`SELECT * FROM tasks ORDER BY created_at DESC`;
  }

  static async findById(id) {
    const result = await sql`SELECT * FROM tasks WHERE id = ${id}`;
    return result[0];
  }

  static async create(title) {
    const result = await sql`
      INSERT INTO tasks (title)
      VALUES (${title})
      RETURNING *
    `;
    return result[0];
  }

  static async delete(id) {
    const result = await sql`
      DELETE FROM tasks
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }

  static async update(id, data) {
    const { title, completed } = data;
    const result = await sql`
      UPDATE tasks
      SET 
        title = COALESCE(${title}, title),
        completed = COALESCE(${completed}, completed)
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  }
}

module.exports = Task;
