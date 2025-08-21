type Props = {
  label: string;
  icon: React.ReactNode;
};

export function CategoryItem({ label, icon }: Props) {
  return (
    <button className="flex flex-col items-center justify-center w-40 h-32 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
      <div className="w-8 h-8 mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
}
