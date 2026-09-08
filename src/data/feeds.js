// Central list of RSS sources, grouped by category.
// Add/remove feeds here — nothing else in the app needs to change.

export const CATEGORIES = {
  top: {
    label: "Top Stories",
    feeds: [
      { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
      { name: "CNN", url: "http://rss.cnn.com/rss/cnn_topstories.rss" },
      {
        name: "NY Times",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
      },
    ],
  },
  world: {
    label: "World",
    feeds: [
      { name: "BBC World", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
      { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
    ],
  },
  technology: {
    label: "Technology",
    feeds: [
      {
        name: "BBC Tech",
        url: "http://feeds.bbci.co.uk/news/technology/rss.xml",
      },
      {
        name: "NY Times Tech",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
      },
    ],
  },
  sports: {
    label: "Sports",
    feeds: [
      { name: "BBC Sport", url: "http://feeds.bbci.co.uk/sport/rss.xml" },
    ],
  },
  business: {
    label: "Business",
    feeds: [
      {
        name: "BBC Business",
        url: "http://feeds.bbci.co.uk/news/business/rss.xml",
      },
      {
        name: "NY Times Business",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
      },
    ],
  },
};

// Flat list of every feed, used by Home to show a mixed front page
export const ALL_FEEDS = Object.values(CATEGORIES).flatMap((c) => c.feeds);
