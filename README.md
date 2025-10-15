# API Todolist - Express.js

Une API REST simple pour gérer une liste de tâches, développée avec Express.js et l'architecture MVC.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm run start
```

Le serveur démarre sur `http://localhost:3000`

## Endpoints

| Méthode | URL | Description | Body |
|---------|-----|-------------|------|
| GET | `/tasks` | Afficher toutes les tâches | - |
| GET | `/tasks/:id` | Afficher une tâche | - |
| POST | `/tasks` | Ajouter une tâche | `{ "title": "..." }` |
| DELETE | `/tasks/:id` | Supprimer une tâche | - |

## Exemples avec Postman

### Ajouter une tâche
- **Méthode** : POST
- **URL** : `http://localhost:3000/tasks`
- **Body (JSON)** :
```json
{
  "title": "Faire les courses"
}
```

### Afficher toutes les tâches
- **Méthode** : GET
- **URL** : `http://localhost:3000/tasks`

### Supprimer une tâche
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/tasks/1`

## Structure du projet

```
├── models/           # Modèles de données
├── controllers/      # Logique métier
├── routes/          # Routes API
└── index.js         # Point d'entrée
```