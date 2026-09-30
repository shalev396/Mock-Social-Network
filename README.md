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


## MongoDB Atlas IAM authentication

The API authenticates to Atlas as an AWS IAM role (`MONGODB-AWS`) instead of a password. The Lambda execution role name is fixed to `mock-social-network-<stage>-api` (stack output `ApiRoleArn`), so its ARN survives deploys. `DATABASE_URL` then carries no credentials:

```
mongodb+srv://<cluster-host>/<database>?authSource=%24external&authMechanism=MONGODB-AWS&retryWrites=true&w=majority&appName=mock-social-network-<stage>
```

The driver (with its optional `aws4` and `@aws-sdk/credential-providers` dependencies; without `aws4` it fails with "Optional module `aws4` not found") signs an STS request with whatever AWS credentials the process has (Lambda role, CI OIDC role, local SSO profile), and Atlas matches the caller's role ARN to a database user. The same URL works locally and on Lambda. No IAM policy is involved; each identity needs an Atlas database user of type **AWS IAM → IAM Role**:

| Identity                              | Atlas roles                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| `mock-social-network-<stage>-api`     | `readWrite` + `dbAdmin` on that stage's database only        |
| CI OIDC role (`my-github-actions-role`) | `readWriteAnyDatabase` + `dbAdminAnyDatabase`              |
| Local SSO role                        | `readWriteAnyDatabase` + `dbAdminAnyDatabase`                |

Register an assumed role by its ARN **without the IAM path**: the SSO role `arn:aws:iam::<account>:role/aws-reserved/sso.amazonaws.com/<region>/AWSReservedSSO_…` becomes `arn:aws:iam::<account>:role/AWSReservedSSO_…`. Locally, run `aws sso login` when the session expires. The Atlas IP access list stays `0.0.0.0/0` because Lambda has no fixed IP. Atlas checks each new connection with STS, so the connection opened at cold start is reused across invocations.
