export default function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="inline-block bg-brand/10 text-brand text-xs font-bold rounded-full px-3 py-1">
      {name}
    </span>
  );
}
