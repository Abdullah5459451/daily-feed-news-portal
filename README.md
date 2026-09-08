# The Daily Feed — News Portal

A React news portal that pulls live articles from RSS feeds (BBC, CNN,
NY Times, Al Jazeera) via the [rss2json.com](https://rss2json.com) proxy,
with category browsing and an article view. Built with React, React
Router, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Optional: API key

The app works without a key at low request volumes. If you start hitting
rate limits, get a free key at https://rss2json.com, then:

```bash
cp .env.example .env
# paste your key into .env
```

## Project structure

```
src/
  components/
    Navbar.jsx     Site header + category navigation
    NewsCard.jsx    A single article preview card
    Loader.jsx      Spinner shown while fetching
  pages/
    Home.jsx        Merged "top stories" from all feeds
    Category.jsx     Feeds filtered to one category (reads :categoryName from the URL)
    Article.jsx      Full article view (reads article passed via router state)
  data/
    feeds.js         All RSS sources, grouped by category — edit this to add/remove feeds
  services/
    newsApi.js       Fetches + parses feeds via rss2json, merges + sorts results
  App.jsx            Route definitions
  main.jsx           App entry point, wraps App in BrowserRouter
```

## How it works

1. `feeds.js` lists RSS URLs grouped by category.
2. `newsApi.js` sends each feed URL to rss2json, which fetches and parses
   the XML server-side and returns JSON — this avoids CORS issues you'd
   hit fetching RSS directly from the browser.
3. `getMergedFeeds()` fetches multiple feeds in parallel with
   `Promise.all`, flattens them into one list, and sorts by publish date.
4. Each `NewsCard` links to `/article/:id`, passing the full article
   object via React Router's `state` (RSS items don't have stable IDs to
   re-fetch by, so the app carries the data along with the navigation
   instead of looking it up again).

## Adding more feeds or categories

Edit `src/data/feeds.js` — add a new key to `CATEGORIES` with a `label`
and a `feeds` array of `{ name, url }` objects. The navbar and routing
pick it up automatically, no other changes needed.

## Known limitations (good next steps)

- No search yet.
- No pagination — feeds are capped at 20 items each.
- Refreshing the Article page directly (without clicking through from a
  card) loses the article data, since it isn't stored in the URL. A nice
  upgrade: store a slug + source in the URL and look the article back up
  from a cached feed, or lift state into Context.
- Some RSS items don't include images — the placeholder in `NewsCard`
  handles this, but you could add a fallback stock image per source.
