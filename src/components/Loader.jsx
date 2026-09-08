function Loader({ label = "Loading news..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-muted">
      <div className="w-8 h-8 border-2 border-ink/20 border-t-accent rounded-full animate-spin mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default Loader;
