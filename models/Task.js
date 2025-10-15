class Task {
  constructor(id, title, completed = false) {
    this.id = id;
    this.title = title; 
    this.completed = completed;
    this.createdAt = new Date();
  }
}

module.exports = Task;
