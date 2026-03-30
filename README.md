# Mock Social Network

[![Live app](https://img.shields.io/badge/Live_demo-mock--social--network.shalev396.com-1877F2?style=for-the-badge)](https://mock-social-network.shalev396.com/)

A full-stack **Instagram-style** social app: feed, explore, reels-style browsing, profiles, posts, comments, and sign-up / login. Built as a portfolio and learning project—not affiliated with Meta or Instagram.

---

## Try it

**[Open the deployed app →](https://mock-social-network.shalev396.com/)**

The UI is **mobile-first**: layouts and navigation are designed for a phone-sized viewport (narrow column, bottom nav). It works on desktop, but the experience is meant to feel like the native app on a small screen.

---

## Tech stack

| Layer | What we use |
|--------|-------------|
| **Frontend** | React 18, Vite, React Router, Redux Toolkit, Tailwind CSS, MUI + Emotion, Axios |
| **Backend** | Node.js, Express (via `serverless-http`), MongoDB + Mongoose, JWT, bcrypt |
| **AWS** | Lambda (HTTP API), S3 static hosting, CloudFront, Route 53, ACM (HTTPS) |
| **CI/CD** | GitHub Actions (OIDC → AWS), Serverless Framework deploy, S3 sync + CloudFront invalidation |

Local backend dev uses **Serverless Offline**; the API contract is documented in [`API.md`](./API.md).

---

## Repository layout

```
Mock-Social-Network/
├── Frontend/     # Vite + React client
├── Backend/      # Serverless Express API + serverless.yml
├── API.md        # REST API reference
└── .github/      # Deploy workflows
```

---

## Local development (quick start)

**Frontend** — from `Frontend/`:

```bash
npm install
npm run dev
```

**Backend** — copy `Backend/.env.example` to `Backend/.env`, fill in MongoDB and secrets, then from `Backend/`:

```bash
npm install
npm run dev
```

Point the frontend at your local API (see `Frontend/src/config/apiBase.js` and env conventions in the Frontend).

