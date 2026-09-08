import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../data/feeds";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm uppercase tracking-wide pb-1 border-b-2 transition-colors ${
      isActive
        ? "border-accent text-ink"
        : "border-transparent text-muted hover:text-ink"
    }`;

  return (
    <header className="border-b border-ink/10 bg-paper sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <NavLink to="/" className="block font-display text-3xl text-ink tracking-tight">
          The Daily Feed
        </NavLink>
        <nav className="flex gap-6 mt-3 overflow-x-auto">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <NavLink key={key} to={`/category/${key}`} className={linkClass}>
              {cat.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
