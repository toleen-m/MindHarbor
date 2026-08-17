# MindHarbor

Application web de suivi du bien-être, de ressources et de groupes de soutien.


---

## 1. Equipe

Membres :

- Toleen Msabeh
- Unaiza Ali, Bhatti


---

## 2. Structure du projet

```text
mindharbor/
│
├── README.md
├── REMISE.md
├── docs/
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   │
│   └── src/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── types/
│       ├── utils/
│       ├── app.ts
│       └── index.ts
│
└── client/
    └── src/
        ├── api/
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        ├── types/
        ├── App.tsx
        └── main.tsx
```
---

## 3. Installation

Prérequis

Il faut avoir installé :
 - Node.js 20+
 - npm
 - une base PostgreSQL Neon
 - Git

---

## 4. Installation du serveur

# 1 Cloner le dépôt

```bash
git clone https://github.com/toleen-m/MindHarbor.git
cd MindHarbor
```

# 2 Configurer le backend

```bash
cd server
```
Renommer le fichier .env.example -> .env, ensuit:
```
npm install
npm run dev
```

Pour initialiser la base Prisma :

```bash
cd server
npx prisma generate
npx prisma migrate dev
```

Ensuite ouvrer le fichier test.res et faite les requetes



# 3 Configurer le frontend

Dans un nouveau terminal :

```bash
cd client
```
Renommer le fichier .env.example -> .env, ensuit:
```
npm install
npm run dev
```

Ouvrer le serveur client dans votre navigateur avec ce lien:

- http://localhost:5173/register








**Cours :** Service Web – Groupe 25604 – Session Été 2026  
