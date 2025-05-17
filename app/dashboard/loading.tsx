import Skeleton from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-16" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card rounded-lg shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            <Skeleton className="h-48 w-full rounded-md" />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-48 w-full rounded-md" />
          </div>
        </div>

        <div className="lg:col-span-3 bg-card rounded-lg shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-56 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-right">
        <Skeleton className="h-4 w-40 ml-auto" />
      </div>
    </div>
  )
}
