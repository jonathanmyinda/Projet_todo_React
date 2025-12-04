# 📝 Todo App — React + TypeScript

Une application Todo moderne construite avec **React**, **TypeScript** et **Vite**, permettant d’ajouter, filtrer et supprimer des tâches avec différents niveaux de priorité.

---

## 🚀 Fonctionnalités

- ➕ Ajouter une tâche  
- 🔍 Filtrer les tâches par priorité (toutes, urgente, moyenne, basse)  
- 🗑️ Supprimer une tâche  
- 💾 Sauvegarde automatique via **localStorage**  
- 🎨 UI moderne, badges de priorité, transitions fluides, **responsive design**  
- ⚡ Développé avec **Vite** pour un rendu ultra rapide  
- 🛡️ Code 100% **TypeScript** (types stricts)  

---

## 🧩 Types utilisés

```ts
type priority = "urgente" | "moyenne" | "basse";

type todo = {
  id: number;
  text: string;
  priority: priority;
};
```

---

## 🛠️ Technologies

- React 18  
- TypeScript  
- Vite  
- DaisyUI / TailwindCSS  
- localStorage  

---

## 👨‍💻 Auteur

**Jonathan Myinda**  
Développeur Fullstack, passionné de **UX/UI**
