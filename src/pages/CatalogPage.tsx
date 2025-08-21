//
import { useEffect, useState } from 'react';
import { Category, LineItem } from '@commercetools/platform-sdk';
import { parseProduct } from '../utils/parseProduct';
import { ProductCard } from '../components/CatalogCard.tsx';
import { FilterSidebar } from '../components/FilterSidebar';
import { getFilteredProducts } from '../services/sdk/GetFilteredProducts';
import { getAvailableFilters } from '../services/sdk/getAvailableFilters';
import { Product } from '../components/CatalogCard.tsx';
import { useSearchStore } from '../store/searchStore';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSearchParams } from 'react-router-dom';
import { CategoryMenu } from '../components/CategoryMenu';
import { getCategories } from '../services/sdk/getCategories';
import { Pagination } from '../components/Pagination';
import { useCartStore } from '../store/cartStore';
import { getCartById } from '../services/sdk/getCartById';

const SORT_OPTIONS = [
  { value: 'price asc', label: 'Price: Low to High' },
  { value: 'price desc', label: 'Price: High to Low' },
  { value: 'name.en-US asc', label: 'Name: A to Z' },
  { value: 'name.en-US desc', label: 'Name: Z to A' },
];

const LIMIT = 9;

export function CatalogPage() {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('price asc');
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const categorySlug = searchParams.get('category');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const { cartId } = useCartStore();

  const searchQuery = useSearchStore((state) => state.query);

  useEffect(() => {
    if (!cartId) return;

    getCartById(cartId)
      .then((cart) => {
        setLineItems(cart.body.lineItems);
      })
      .catch(console.error);
  }, [cartId]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => console.error('Ошибка загрузки категорий', e))
      .finally(() => setCategoriesLoading(false));
  }, []);

  useEffect(() => {
    getAvailableFilters()
      .then(setFilters)
      .catch((e) => console.error('Ошибка загрузки доступных фильтров:', e));
  }, []);

  {
    /* Set offset to 0 in case if a filter was changed */
  }
  useEffect(() => {
    setOffset(0);
  }, [selectedFilters, sortOrder, categorySlug, searchQuery]);

  useEffect(() => {
    {
      /* Продолжить только когда категории получены */
    }
    if (categoriesLoading) return;

    {
      /* Поиск ID категории по category.slug */
    }
    const categoryId = categories?.find(
      (category) => category.slug['en-US'] === categorySlug
    )?.id;
    console.log('Category ID', categoryId);

    {
      /* Остановка получения продуктов, если category ID является undefined */
    }
    if (!categorySlug || !categoryId) return;

    setLoading(true);
    console.log(
      '*** Перед фильтрацией, selectedFilters =',
      selectedFilters,
      'sortOrder =',
      sortOrder
    );

    getFilteredProducts(
      selectedFilters,
      LIMIT,
      sortOrder,
      searchQuery,
      categoryId,
      offset
    )
      .then(({ products, total }) => {
        console.log(
          'Получено после фильтрации (data):',
          products.map((p) => ({
            id: p.id,
            brand: p.masterVariant.attributes?.find((a) => a.name === 'brand')
              ?.value,
            color: p.masterVariant.attributes?.find((a) => a.name === 'color')
              ?.value,
            name: p.name['en-US'],
          }))
        );
        const parsedProducts = products.map(parseProduct);
        console.log('Parsed products for ProductCard:', parsedProducts);

        if (total) {
          setTotal(total);
        }

        setProducts(parsedProducts);
        setError(null);
      })
      .catch((err) => {
        console.error('Ошибка загрузки продуктов:', err);
        setError('Не удалось загрузить товары. Попробуйте позже.');
      })
      .finally(() => setLoading(false));
  }, [
    categorySlug,
    selectedFilters,
    sortOrder,
    searchQuery,
    categories,
    categoriesLoading,
    offset,
  ]);

  const handleFilterChange = (
    title: string,
    option: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const current = prev[title] || [];
      const updated = checked
        ? [...current, option]
        : current.filter((val) => val !== option);
      return {
        ...prev,
        [title]: updated,
      };
    });
  };

  const handleSortChange = (value: string) => {
    console.log('Выбранная сортировка:', value);
    setSortOrder(value);
  };

  {
    /* Отрисовка меню категорий, если в URL отсутсвует категория */
  }
  if (!categorySlug) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Browse categories</h1>
        <CategoryMenu categories={categories} />
      </div>
    );
  }
  return (
    <main className="bg-white min-h-full w-full mt-2">
      <div className="max-w-[1440px] mx-auto pl-6 pr-4">
        <Breadcrumbs
          categories={categories}
          currentCategorySlug={categorySlug}
        />
      </div>
      <div className="max-w-[1440px] mx-auto px-4 flex">
        {/*Cортировка + список товаров */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Блок сортировки */}
          <div className="flex justify-end">
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Sort by</option>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <aside className="w-1/4">
              {/* Боковая панель фильтров */}
              <FilterSidebar
                filters={filters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </aside>

            {/* Список продуктов */}
            <section className="w-3/4 flex flex-col min-h-full">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  items-start mt-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCard key={`skeleton-${i}`} loading />
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : !products.length ? (
                <p>Нет товаров по выбранным фильтрам.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  items-start mt-2">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      name={p.name}
                      description={p.description}
                      imageUrl={p.imageUrl}
                      images={p.images}
                      price={p.price}
                      originalPrice={p.originalPrice}
                      inCart={lineItems.some((item) => item.productId === p.id)}
                    />
                  ))}
                </div>
              )}
              <Pagination
                limit={LIMIT}
                offset={offset}
                total={total}
                setOffset={setOffset}
                loading={loading}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
