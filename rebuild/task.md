# Nodebase2 Rebuild Task List

## Phase 1: Foundation
- [x] Create project structure (src/app, src/lib, src/components) <!-- id: 0 -->
- [x] Create core files (layout.tsx, page.tsx, globals.css) <!-- id: 1 -->
- [x] Configure Tailwind CSS v4 <!-- id: 2 -->
- [x] Initialize shadcn/ui (components.json, utils.ts) <!-- id: 3 -->
- [x] Install dependencies <!-- id: 4 -->

## Phase 2: Database Integration (Prisma)
- [x] Install Prisma & Prisma Client (and adapter-pg) <!-- id: 5 -->
- [x] Configure `prisma/schema.prisma` (User, Workflow models) <!-- id: 6 -->
- [x] Set up `src/lib/db.ts` (Global Prisma Client) <!-- id: 7 -->
- [x] Configure Postgres (Neon) connection string in `.env` <!-- id: 8 -->
- [x] Generate Prisma Client <!-- id: 9 -->

## Phase 3: Authentication & API (Better-Auth + tRPC)
- [x] Install Better-Auth & tRPC dependencies <!-- id: 10 -->
- [x] Configure Auth Schema in Prisma <!-- id: 11 -->
- [x] Set up tRPC (server, client, provider) <!-- id: 12 -->
- [x] Implement Auth API routes & Components <!-- id: 13 -->

## Phase 4: Background Workflows (Inngest)
- [x] Install Inngest & mprocs <!-- id: 14 -->
- [x] Configure Inngest Client & Functions <!-- id: 15 -->
- [x] Create Hello World Workflow <!-- id: 16 -->

## Phase 5: Workflow UI & Full Integration
- [x] Create workflow tRPC router (CRUD) <!-- id: 17 -->
- [x] Create Dashboard page (list workflows) <!-- id: 18 -->
- [x] Create workflow trigger (Inngest integration) <!-- id: 19 -->
- [ ] Verify end-to-end flow <!-- id: 20 -->
