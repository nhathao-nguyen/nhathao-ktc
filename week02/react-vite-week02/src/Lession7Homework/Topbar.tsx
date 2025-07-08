export default function Topbar() {
  return (
    <header className="h-16 px-6 border-b bg-white flex items-center justify-between">
      {/* Search box */}
      <input
        type="text"
        placeholder="Search..."
        className="border px-3 py-1 rounded w-1/3 text-sm focus:outline-none"
      />
      {/* Notification + User */}
      <div className="flex items-center gap-4">
        <span className="text-xl">🔔</span>
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span className="text-sm font-medium">Emma Kwan</span>
      </div>
    </header>
  );
}
