# API Todolist - Express.js

Une API REST simple pour gérer une liste de tâches, développée avec Express.js, MongoDB et l'architecture MVC.

## Prérequis

- Node.js (version 20 ou supérieure)
- MongoDB (local ou via Docker)
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone https://github.com/jordyvuong/Exercice2-Vuong-Jordy.git
cd Exercice2-Vuong-Jordy
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
```bash
cp .env.sample .env
```
Puis modifier le fichier `.env` avec vos paramètres de base de données.

## Démarrage

### Développement local

```bash
# Démarrage en mode développement (avec auto-reload)
npm run dev

# Démarrage en mode production
npm run start
```

### Avec Docker

```bash
# Démarrer l'application et MongoDB avec Docker Compose
docker-compose up -d

# Arrêter les services
docker-compose down
```

Le serveur démarre sur `http://localhost:3000`

## Documentation API

L'API est documentée avec Swagger/OpenAPI. Une fois le serveur démarré, vous pouvez accéder à :

- **Documentation interactive** : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Spécification OpenAPI (JSON)** : [http://localhost:3000/api-docs.json](http://localhost:3000/api-docs.json)

La documentation Swagger vous permet de :
- Visualiser tous les endpoints disponibles
- Tester les requêtes API directement depuis l'interface
- Consulter les schémas de données et les exemples de requêtes/réponses

## API Endpoints

### Base URL
- **GET** `/` - Page d'accueil avec liste des endpoints disponibles

### Tasks

| Méthode | URL | Description | Body | Réponse |
|---------|-----|-------------|------|----------|
| GET | `/tasks` | Afficher toutes les tâches | - | Array de tâches |
| GET | `/tasks/:id` | Afficher une tâche spécifique | - | Objet tâche |
| POST | `/tasks` | Ajouter une nouvelle tâche | `{ "title": "..." }` | Tâche créée |
| DELETE | `/tasks/:id` | Supprimer une tâche | - | Message de confirmation |

## Exemples d'utilisation

### Avec Swagger UI (Recommandé)

Accédez à [http://localhost:3000/api-docs](http://localhost:3000/api-docs) pour tester l'API directement depuis l'interface Swagger.

### Avec Postman

#### Ajouter une tâche
- **Méthode** : POST
- **URL** : `http://localhost:3000/tasks`
- **Headers** : `Content-Type: application/json`
- **Body (JSON)** :
```json
{
  "title": "Faire les courses"
}
```

#### Afficher toutes les tâches
- **Méthode** : GET
- **URL** : `http://localhost:3000/tasks`

#### Supprimer une tâche
- **Méthode** : DELETE
- **URL** : `http://localhost:3000/tasks/{id}`

## Structure du projet

```
├── config/
│   └── db.js            # Configuration MongoDB
├── controllers/         # Logique métier
├── models/             # Modèles de données Mongoose
├── routes/             # Définition des routes API
├── .env.sample         # Variables d'environnement exemple
├── .dockerignore       # Fichiers ignorés par Docker
├── Dockerfile          # Configuration Docker
├── docker-compose.yml  # Orchestration Docker
├── index.js           # Point d'entrée de l'application
└── package.json       # Dépendances et scripts
```

## Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **Swagger/OpenAPI** - Documentation API interactive
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement
- **Docker** - Containerisation

## Scripts disponibles

```bash
npm run start    # Démarre l'application en production
npm run dev      # Démarre en mode développement avec auto-reload
```

## Configuration

### Variables d'environnement

- `MONGODB_URI` - URI de connexion MongoDB (défaut: `mongodb://localhost:27017/exercice2`)
- `PORT` - Port du serveur (défaut: 3000)
- `NODE_ENV` - Environnement d'exécution (development/production)
