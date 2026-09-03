const SkeletonCard = ()=> {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="aspect-[4/3] w-full bg-line/50" />
      <div className="space-y-2 p-4">
        <div className="h-3 w-3/4 rounded bg-line/60" />
        <div className="h-3 w-1/2 rounded bg-line/50" />
        <div className="mt-3 h-8 w-full rounded-lg bg-line/40" />
      </div>
    </div>
  );
}

export default SkeletonCard;