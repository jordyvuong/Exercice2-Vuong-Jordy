class Task {
  constructor(id, title, completed = false) {
    this.id = id; // L'id de la tâche
    this.title = title; // Titre de la tâche
    this.completed = completed; // Etat de la tâche
    this.createdAt = new Date(); // Date de création de la tâche
  }
}

module.exports = Task;
