# Guille-Stack

## About this project

This project is an experiment to see how a modern app, with features like authentication, subscriptions, API routes, and static pages, would work in Next.js 13 app directory.

## Tech Stack

- Next.js 13: The latest version of Next.js is used for app directory management, routing, layouts, loading UI, and API routes.
- React 18: Both server and client components are implemented using React 18. Hooks are utilized for state management.
- Database: The app employs an ORM using Prisma and is deployed on PlanetScale.
- Components: UI components are built using Radix UI and styled with Tailwind CSS.
- Authentication: NextAuth.js and middlewares are used for authentication.
- Subscriptions: The app supports both free and paid subscriptions using Mercadopago.

## Known Issues

A list of things not working right now:

1. ~Mercadopago subscriptions~

## Running Locally

1. Install dependencies using npm:

```sh
npm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
npm run dev
```
