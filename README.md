This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.


--------------------------------------------------------------------------------------------------------------------------------


# Pastebin Lite

A lightweight Pastebin-like application built with **Next.js** and **Upstash Redis**.  
Users can create text pastes with optional **time-based expiry (TTL)** and/or **view-count limits**.  
Once any constraint is triggered, the paste becomes unavailable.

---

## 🚀 How to Run the App Locally

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd pastebin-lite


Install dependencies
npm install


Create .env.local

Create a file named .env.local in the project root and add:

NEXT_PUBLIC_BASE_URL=http://localhost:3000
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token


Run the development server
npm run dev



Persistence Layer

This project uses Upstash Redis as the persistence layer.
Data is stored as Redis key-value pairs
Each paste is saved under a unique key: paste:<id>
Redis TTL is used for automatic expiry when time-based expiration is enabled
View count is manually decremented on each access



Why Redis?

Fast read/write performance
Built-in TTL support
Serverless-friendly and works well with Vercel

 Important Design Decisions
1. Server-side Enforcement of Constraints
TTL and view limits are enforced in API routes
This prevents bypassing rules from the frontend

2. Optional Constraints

A paste may have:

Only TTL

Only view limit

Both TTL and view limit

If both are present, the paste expires as soon as either condition is met

3. Stateless Frontend
No authentication or user sessions

All state is managed via Redis and API responses

4. Clean UI with Minimal Dependencies

No UI libraries used

Simple, clean CSS for readability and performance