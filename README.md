📝 Todo App — React + TypeScript

Une application Todo moderne construite avec React, TypeScript, et Vite, permettant d’ajouter, filtrer et supprimer des tâches avec différents niveaux de priorité.

🚀 Fonctionnalités

➕ Ajouter une tâche

🔍 Filtrer les tâches par priorité (toutes, urgente, moyenne, basse)

🗑️ Supprimer une tâche

💾 Sauvegarde automatique via localStorage

🎨 UI moderne, badges de priorité, transitions fluides

⚡ Développé avec Vite pour un rendu ultra rapide

🛡️ Code 100% TypeScript (types stricts)

📂 Structure du projet
src/
│── components/
│   └── TodoItem.tsx
│
│── App.tsx
│── main.tsx
│── index.css
│
package.json
vite.config.ts

💻 Installation & utilisation
1️⃣ Cloner le projet
git clone https://github.com/ton-repo/todo-app.git
cd todo-app

2️⃣ Installer les dépendances
npm install

3️⃣ Lancer le serveur de développement
npm run dev

4️⃣ Build pour la production
npm run build

🧩 Types utilisés
type priority = "urgente" | "moyenne" | "basse";

type todo = {
  id: number;
  text: string;
  priority: priority;
};

🛠️ Technologies

React 18

TypeScript

Vite

DaisyUI / TailwindCSS (si tu les as utilisé)

localStorage

📸 Aperçu (optionnel)

(Ajoute une capture d’écran si tu veux 🔥)

👨‍💻 Auteur

Jonathan Myinda
Développeur Fullstack Passionné de UX/UI