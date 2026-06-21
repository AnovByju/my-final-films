# myFinalFilms 🎬

A TikTok-meets-Tinder movie discovery app. Scroll through 10 curated films, pick your top 3, then eliminate until you land on **the one** to watch tonight.

## Features
- 📱 **TikTok-style vertical feed** — swipe/tap through 10 films
- 🃏 **Elimination round** — Tinder-style swipe left (dismiss) / right (keep) until 1 film remains
- 🔖 **Save for later** — bookmark any film at any time
- 💬 **Letterboxd-style comments** — community reviews on every film card
- 🎡 **Random Picker** — spin the wheel with a 2-hour cooldown (commit to your choice!)
- 🔍 **Genre & Language filters** — action + Korean? We've got you
- ✨ **iOS-like smooth animations** throughout

## Deploy to Vercel in 3 steps

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
gh repo create my-final-films --public --push
```
*(Install GitHub CLI from cli.github.com if needed)*

### Step 2 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project**
3. Import your `my-final-films` repository
4. Click **Deploy** — Vercel auto-detects Next.js, no config needed

### Step 3 — Done!
Vercel gives you a URL like `my-final-films.vercel.app` in about 60 seconds.

## Run locally
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Extend the app

### Add real Letterboxd data
Letterboxd doesn't have an official public API, but you can:
- Use [letterboxd-client](https://www.npmjs.com/package/letterboxd-client) (unofficial)
- Scrape via a serverless function (Vercel Edge Functions)
- Use TMDB API for ratings/reviews: [themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)

### Add more movies
Edit `MOVIES` array in `src/components/MyFinalFilms.jsx`.  
Each movie needs: `id, title, year, lb (Letterboxd rating), genres[], lang, dir, runtime, bg (fallback color), desc, poster (TMDB URL), comments[]`

### Add user accounts
Consider [Clerk](https://clerk.com) for auth (free tier, Next.js native) and [Supabase](https://supabase.com) for storing saved films per user.

### Algorithm improvements
The 3-in-10 unique recommendation logic lives in the `movies` computed array. 
Wire it to a recommendation API or shuffle based on user history stored in localStorage or a DB.
