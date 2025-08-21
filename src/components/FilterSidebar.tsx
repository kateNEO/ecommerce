import { Filter } from './Filter';

export type FilterSidebarProps = {
  filters: { [key: string]: string[] };
  selectedFilters: { [key: string]: string[] };
  onFilterChange: (title: string, option: string, isChecked: boolean) => void;
};

export function FilterSidebar({
  filters,
  selectedFilters,
  onFilterChange,
}: FilterSidebarProps) {
  return (
    <div className="max-w-3xs flex flex-col mt-8 pr-4 ">
      {Object.entries(filters).map(([title, options]) => (
        <Filter
          key={title}
          title={title}
          options={options}
          selected={selectedFilters[title] || []}
          onChange={onFilterChange}
        />
      ))}
    </div>
  );
}
