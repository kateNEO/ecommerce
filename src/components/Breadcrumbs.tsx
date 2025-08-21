import { Category } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  currentCategorySlug?: string;
  categories: Category[];
  productName?: string;
}

export function Breadcrumbs({
  currentCategorySlug,
  categories,
  productName,
}: BreadcrumbsProps) {
  const findCategoryBySlug = (slug: string) => {
    return categories.find((category) => category.slug['en-US'] === slug);
  };

  const buildBreadcrumbTrail = (category: Category | undefined): Category[] => {
    if (!category) return [];
    const parent = categories.find((cat) => cat.id === category.parent?.id);
    return [...buildBreadcrumbTrail(parent), category];
  };

  const trail =
    currentCategorySlug && categories.length > 0
      ? buildBreadcrumbTrail(findCategoryBySlug(currentCategorySlug))
      : [];

  return (
    <nav className="text-xl text-gray-500 py-4 w-full overflow-x-auto whitespace-nowrap mb-10">
      <ul className="flex items-center space-x-5">
        <li>
          <Link to="/" className="text-gray-500 hover:underline transition">
            Home
          </Link>
        </li>
        <li>
          <span className="text-gray-400 mr-5">{'>'}</span>
          <Link
            to="/catalog"
            className="text-gray-500 hover:underline transition"
          >
            Catalog
          </Link>
        </li>
        {trail.map((cat, index) => {
          const label = cat.name['en-US'];
          const slug = cat.slug['en-US'];
          const slugPath = `/catalog?category=${slug}`;
          const isLastCategory = index === trail.length - 1;

          return (
            <li key={cat.id}>
              <span className="text-gray-400 mr-5">{'>'}</span>
              {isLastCategory && !productName ? (
                <span className="font-semibold text-black">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </span>
              ) : (
                <Link
                  to={slugPath}
                  className="text-gray-500 hover:underline transition"
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
        {productName && (
          <li>
            <span className="text-gray-400 mr-5">{'>'}</span>
            <span className="font-semibold text-black">
              {productName.charAt(0).toUpperCase() + productName.slice(1)}
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}
