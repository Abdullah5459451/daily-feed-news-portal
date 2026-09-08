import axios from "axios";

const RSS2JSON_BASE = "https://api.rss2json.com/v1/api.json";

// Get a free key at https://rss2json.com if you hit rate limits without one.
const API_KEY = import.meta.env.VITE_RSS2JSON_KEY || "";

/**
 * Fetch and parse a single RSS feed.
 * Returns an array of article items, or [] if the feed fails
 * (so one broken source doesn't break the whole page).
 */
export const getFeed = async (rssUrl, sourceName) => {
  try {
    const res = await axios.get(RSS2JSON_BASE, {
      params: {
        rss_url: rssUrl,
        api_key: API_KEY || undefined,
        count: 20,
      },
    });

    if (res.data.status !== "ok") {
      console.warn(`Feed error for ${sourceName}:`, res.data.message);
      return [];
    }

    return res.data.items.map((item, i) => ({
      id: `${sourceName}-${i}-${item.guid || item.link}`,
      title: item.title,
      link: item.link,
      description: stripHtml(item.description),
      thumbnail: item.thumbnail || extractImage(item.content),
      pubDate: item.pubDate,
      source: sourceName,
      content: item.content,
    }));
  } catch (err) {
    console.error(`Failed to fetch feed: ${sourceName}`, err);
    return [];
  }
};

/**
 * Fetch multiple feeds in parallel and merge them into one
 * chronologically sorted list.
 */
export const getMergedFeeds = async (feedList) => {
  const results = await Promise.all(
    feedList.map((feed) => getFeed(feed.url, feed.name))
  );
  return results.flat().sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
};

// --- helpers -------------------------------------------------

function stripHtml(html = "") {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

function extractImage(html = "") {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}
