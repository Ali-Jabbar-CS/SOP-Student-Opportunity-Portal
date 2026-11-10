# SOP: Student Opportunity Portal

A full-stack web app that helps students find, vet, and track internships, scholarships, and fellowships, and helps their advisors follow along. It is built with React and Vite on Supabase (PostgreSQL and Auth), with Claude-powered tools running in Vercel serverless functions.

**Live app:** [sop-student-portal.vercel.app](https://sop-student-portal.vercel.app/dashboard)

International students face an extra layer of risk in the job search: postings that quietly exclude their visa type, and scams that target them directly. SOP puts opportunity search, visa filtering, a scam checker, and an application tracker in one place.

## Features

### For students

- **Opportunities feed** from the database, with a verified badge, a link to the official page (or a search fallback), and urgent flags for deadlines within 7 days
- **Visa compatibility filter:** F-1 / International OK, Requires CPT / OPT, or US Citizens Only
- **Application tracker:** a Kanban board with Interested, Applying, Submitted, and Results columns, plus an accepted or rejected outcome on finished applications. Applications are saved per user.
- **Cover letter builder:** pick an opportunity from your tracker, set the tone with a slider, and Claude drafts a letter from your profile. Missing details stay as placeholders, like `[YOUR SCHOOL]`, so nothing is invented.
- **"Is This Legit?" checker:** paste a posting or URL and Claude returns a 0 to 100 legitimacy score, a safe, warning, or danger verdict, and five checks (upfront fees, vague descriptions, unofficial email domains, unrealistic pay, pressure tactics, and more)
- **Saved opportunities**, a profile page, and linking to an advisor

### For advisors

- A separate advisor dashboard and layout, chosen by the role on the user's profile
- A student roster built from advisor-student links
- An opportunities view to browse what students see

### Across the app

- Email and password sign-up with email confirmation, plus Google sign-in
- Multi-step sign-up with school and major dropdowns (each with an "Other" option) and advisor-specific steps
- Dark mode that persists across visits, and animated page transitions

## Architecture

```
Browser (React 19 + Vite SPA)
  ├── Supabase Auth ........ sign-up, login, Google OAuth, sessions
  ├── Supabase Postgres .... profiles, opportunities, applications,
  │                          saved_opportunities, advisor_students
  │                          (row-level security enforced in the database)
  └── /api/* on Vercel ..... serverless functions that call the Claude API
        ├── generate-letter.js
        └── check-legit.js
```

**Why the Claude calls run server-side:** anything Vite bundles with a `VITE_` prefix ships to the browser, where anyone can read it. The Anthropic API key lives only in Vercel's environment variables, and the browser calls `/api/*` instead of Anthropic directly. The Supabase anon key does ship to the browser, which is how Supabase is designed to work: the database's row-level security policies, not the key, decide what each user can read or write.

## Data model

| Table | Holds |
| --- | --- |
| `profiles` | One row per user: name, school, major, year, visa status, and role (`student` or `advisor`) |
| `opportunities` | Listings with type, organization, deadline, tags, visa status, source URL, verified flag, and active flag |
| `applications` | A student's tracker cards: status column, progress, and a notes field that currently packs title, deadline, notes, and outcome |
| `saved_opportunities` | Opportunities a student bookmarked |
| `advisor_students` | Links between an advisor and each of their students |

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, Framer Motion, Lucide icons |
| Backend | Supabase (PostgreSQL, Auth, row-level security) |
| AI | Anthropic Claude API (Messages API) |
| Hosting | Vercel (static site and serverless functions) |

## Run it locally

You need Node 18 or newer, a Supabase project, and an Anthropic API key.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. The `/api` functions run on Vercel. To test the cover letter builder and legit checker locally, use the [Vercel CLI](https://vercel.com/docs/cli) with `ANTHROPIC_API_KEY` set:

   ```bash
   vercel dev
   ```

## Project structure

```
api/                  Vercel serverless functions (Claude calls)
src/pages/            student pages (Dashboard, Opportunities, Tracker, ...)
src/pages/Advisor/    advisor dashboard, students, opportunities
src/components/       layout, cards, modals, landing page sections
src/context/          UserContext: session and profile state
src/lib/supabase.js   Supabase client
```

## Roadmap

Parts of the interface are ahead of the backend. These are next:

- [ ] Replace the placeholder match score on opportunity cards with a real match computed from the student's profile
- [ ] Wire the Recruiters and Notifications pages to live data (they show sample data today)
- [ ] Save advisor recommendations to the database (the send button confirms in the UI only)
- [ ] Drag and drop between tracker columns
- [ ] Version the row-level security policies in the repo (`supabase/policies.sql`) so they can be reviewed with the code
- [ ] Give tracker cards real `title`, `org`, `deadline`, and `outcome` columns instead of packing them into the notes field
