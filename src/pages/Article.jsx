import { useLocation, Link } from "react-router-dom";

function Article() {
  const location = useLocation();
  const article = location.state?.article;

  // RSS items don't have stable IDs to look up by URL alone, so this
  // page relies on the article being passed via router state from the
  // card the user clicked. If someone lands here directly (e.g. a
  // refresh or shared link), send them back to browse instead.
  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-muted mb-4">
          This article isn't available directly — please open it from the
          news list.
        </p>
        <Link to="/" className="text-accent underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/" className="text-sm text-muted hover:text-ink">
        ← Back
      </Link>

      <span className="block text-accent text-xs font-semibold uppercase tracking-wide mt-6">
        {article.source}
      </span>
      <h1 className="font-display text-3xl text-ink mt-2 leading-tight">
        {article.title}
      </h1>
      <p className="text-sm text-muted mt-2">
        {new Date(article.pubDate).toLocaleString()}
      </p>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt=""
          className="w-full rounded-md mt-6 object-cover"
        />
      )}

      <p className="text-ink/90 leading-relaxed mt-6 whitespace-pre-line">
        {article.description}
      </p>

      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8 text-accent underline"
      >
        Read full article at {article.source} →
      </a>
    </article>
  );
}

export default Article;
