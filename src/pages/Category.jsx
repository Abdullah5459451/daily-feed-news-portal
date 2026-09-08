import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getMergedFeeds } from "../services/newsApi";
import { CATEGORIES } from "../data/feeds";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

function Category() {
  const { categoryName } = useParams();
  const category = CATEGORIES[categoryName];

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    let cancelled = false;
    setLoading(true);
    setArticles([]);

    getMergedFeeds(category.feeds)
      .then((items) => {
        if (!cancelled) setArticles(items);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load this category right now.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // re-fetch whenever the category in the URL changes
  }, [categoryName]);

  // Unknown category in the URL — send back to Home
  if (!category) return <Navigate to="/" replace />;

  if (loading) return <Loader label={`Loading ${category.label}...`} />;
  if (error) return <p className="text-center py-24 text-accent">{error}</p>;
  if (articles.length === 0)
    return <p className="text-center py-24 text-muted">No articles found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="font-display text-2xl text-ink mb-6">{category.label}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Category;
