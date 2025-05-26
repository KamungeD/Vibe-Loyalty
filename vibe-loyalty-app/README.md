# Vibe Loyalty Rewards App

**Author:** Duncan Kamunge  
**Email:** duncan.kamunge@gmail.com  
**GitHub:** [KamungeD](https://github.com/KamungeD)

## Overview

A loyalty rewards system for local salons, barbershops, and eateries.  
Tracks customer visits via phone number and rewards frequent customers.

## Tech Stack

- **Frontend:** React (TypeScript)
- **Backend:** Node.js, Express (TypeScript)
- **Database & Auth:** Supabase
- **AI/Low-Code Tools:** Lovable.dev, Bolt.new, Cursor AI, MGX, Claude.ai

## Project Structure

## Project Structure

```
vibe-loyalty-app/
├── backend/
├── frontend/
├── shared/
├── README.md
├── package.json
├── .gitignore
└── netlify.toml
```

## Getting Started

1. **Supabase:**  
   - Create a project at [supabase.com](https://supabase.com/)
   - Run the provided SQL to create `customers` and `visits` tables.
   - Add your Supabase credentials to `backend/.env` and `frontend/.env`.

2. **Install dependencies:**  
   - `cd backend && npm install`
   - `cd frontend && npm install`

3. **Run locally:**  
   - Backend: `npm run dev`
   - Frontend: `npm run dev`

4. **Deploy:**  
   - Backend: [Render.com](https://render.com/) (see their docs)
   - Frontend: [Netlify](https://netlify.com/) (`netlify.toml` included)

## API Usage

- **POST `/api/loyalty/checkin`**  
  Request: `{ "phone": "0712345678", "name": "Jane" }`  
  Response: `{ id, name, phone, points, visits, rewards }`

- **GET `/api/loyalty/customer/:phone`**  
  Response: `{ id, name, phone, points, visits, rewards }`

## Live Demo

- **Frontend:** [your-netlify-url]
- **Backend:** [your-render-url]

## Hackathon Brief

Built for the [Vibe Coding Hackathon](./brief.txt) — #1MillionDevs Movement.

## Judging Criteria Mapping

- **Prompt Engineering:** Used Claude.ai and Copilot for code and prompt design.
- **Aesthetic Appeal & Vibes:** Clean UI, smooth user flow, and joyful check-in experience.
- **Technical Creativity & Flow:** Modular code, Supabase integration, and low-code tools.
- **Rapid Prototyping & Execution:** Built full-stack MVP with rapid iteration using AI/low-code tools.

## Use of AI and Low-Code Tools

- **Cursor AI:** Code reviews and suggestions for backend/frontend.
- **Supabase:** Low-code backend and authentication.
- **MGX:** UI prototyping before React implementation.
- **Lovable.dev/Bolt.new:** Auto-generated backend docs and scaffolding.
- **Claude.ai:** Prompt engineering and user flow brainstorming.
- **GitHub Copilot:** Boilerplate code, interfaces, and error handling.

These tools enabled rapid prototyping, improved code quality, and allowed me to focus on delivering a joyful, human-centered solution within the hackathon timeframe.

## License

MIT

