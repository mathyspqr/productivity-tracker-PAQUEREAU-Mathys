# Tracker de productivité réactif

Projet Angular autonome pour le TP `signal`, `computed` et `effect`.

Prérequis : Node.js 24.15.0 ou une version acceptée par Angular CLI 22.

```bash
npm install
npm start
```

Ouvrir `http://localhost:4200/`.

La progression est stockée dans `localStorage` avec la clé `tasks`. L'alerte s'affiche quand l'utilisateur atteint cinq tâches ; un rafraîchissement avec l'objectif déjà atteint ne la répète pas.
