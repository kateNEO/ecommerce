import { ProductCard } from './CatalogCard';
import { Product } from './CatalogCard';

type Props = {
  products?: Product[];
};

export function Discounts({ products = [] }: Props) {
  const discountedProducts = products.filter(
    (product) => product.originalPrice !== undefined
  );

  if (discountedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">🔥 Discounts up to -50%</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
