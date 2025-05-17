import Skeleton from "../../../components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}