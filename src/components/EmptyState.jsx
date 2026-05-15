export default function EmptyState() {
  return (
    <div className="bg-white rounded-xl p-10 text-center shadow-sm border">
      <h2 className="text-xl font-semibold mb-2">
        No job requests found
      </h2>

      <p className="text-gray-500">
        Try changing the filters or create a new job request.
      </p>
    </div>
  );
}