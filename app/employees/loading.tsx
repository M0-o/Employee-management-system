import Skeleton from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y">
          <thead className="bg-muted">
            <tr>
              {[...Array(6)].map((_, idx) => (
                <th key={idx} className="px-6 py-3 text-left">
                  <Skeleton className="h-6 w-32" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {[...Array(5)].map((_, row) => (
              <tr key={row}>
                {[...Array(6)].map((_, col) => (
                  <td key={col} className="px-6 py-4">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}