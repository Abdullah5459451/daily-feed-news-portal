import { Link } from "react-router-dom";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 36e5);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function NewsCard({ article }) {
  return (
    <Link
      to={`/article/${article.id}`}
      state={{ article }}
      className="group flex flex-col border border-ink/10 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] bg-ink/5 overflow-hidden">
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">
            No image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-accent text-xs font-semibold uppercase tracking-wide">
          {article.source}
        </span>
        <h2 className="font-display text-lg leading-snug text-ink line-clamp-2">
          {article.title}
        </h2>
        <p className="text-sm text-muted line-clamp-2">{article.description}</p>
        <span className="text-xs text-muted mt-auto pt-2">
          {timeAgo(article.pubDate)}
        </span>
      </div>
    </Link>
  );
}

export default NewsCard;
