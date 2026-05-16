import { FileSearch } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="glass-card rounded-3xl p-14 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-6">
        <FileSearch size={34} />
      </div>

      <h2 className="text-2xl font-bold mb-3">
        No Jobs Found
      </h2>

      <p className="text-gray-500 max-w-md mx-auto leading-7">
        There are currently no matching job requests.
        Try changing the selected category filter.
      </p>
    </div>
  );
}