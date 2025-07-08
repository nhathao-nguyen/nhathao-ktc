interface SidebarProps {
  onFilter: (id: number, checked: boolean) => void;
  defaultChecked: number[];
  categories: { id: number; name: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  onFilter,
  defaultChecked,
  categories,
}) => {
  return (
    <div className="w-64 p-4">
      <h2 className="text-lg font-semibold mb-2">Bộ lọc</h2>
      {categories.map((cat) => (
        <div key={cat.id} className="mb-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={defaultChecked.includes(cat.id)}
              onChange={(e) => onFilter(cat.id, e.target.checked)}
            />
            <span>{cat.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
