import { useState, useEffect } from "react";
import { getMergedFeeds } from "../services/newsApi";
import { ALL_FEEDS } from "../data/feeds";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    getMergedFeeds(ALL_FEEDS)
      .then((items) => {
        if (!cancelled) setArticles(items);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load the news right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-center py-24 text-accent">{error}</p>;
  if (articles.length === 0)
    return <p className="text-center py-24 text-muted">No articles found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl text-ink mb-6">Top Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Home;
