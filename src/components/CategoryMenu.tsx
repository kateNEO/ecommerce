import { Category } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';

type CategoryMenuProps = {
  categories: Category[];
};

export function CategoryMenu({ categories }: CategoryMenuProps) {
  const navigate = useNavigate();

  const handleClick = (slug: string) => {
    navigate(`/catalog?category=${slug}`);
  };

  if (!categories.length) {
    return (
      <div className="text-center text-gray-500 text-lg py-10">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-6 rounded-xl shadow transition text-center text-lg font-medium"
          onClick={() => handleClick(category.slug['en-US'])}
        >
          {category.name['en-US'].charAt(0).toUpperCase() +
            category.name['en-US'].slice(1)}
        </div>
      ))}
    </div>
  );
}
