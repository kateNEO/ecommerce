import { HeroSection } from '../components/HeroSection';
import { CategorySlider } from '../components/CategorySlider';
import { Banners } from '../components/Banners';
import { Discounts } from '../components/Discounts';
import { BannerSale } from '../components/BannerSale';
import { Product } from '../components/CatalogCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/sdk/getProducts';
import { parseProduct } from '../utils/parseProduct';
import '../styles/index.css';

export function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const raw = await getProducts(100);
      const parsed = raw.map(parseProduct);
      setProducts(parsed);
    }

    loadProducts();
  }, []);
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <HeroSection />
      <CategorySlider />
      <Banners />
      <Discounts products={products} />
      <BannerSale />
    </main>
  );
}
