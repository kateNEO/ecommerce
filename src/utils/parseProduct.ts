import { ProductProjection } from '@commercetools/platform-sdk';
import { Product } from '../components/CatalogCard.tsx';

function formatPrice(centAmount?: number): string | undefined {
  return typeof centAmount === 'number'
    ? (centAmount / 100).toFixed(2)
    : undefined;
}

export function parseProduct(product: ProductProjection): Product {
  const master = product.masterVariant;
  const priceInfo = master?.prices?.[0];
  const imageUrl = master?.images?.[0]?.url;
  const images = master?.images?.map((img) => img.url) || [];
  const currentPrice = priceInfo?.discounted?.value || priceInfo?.value;
  const originalPrice = priceInfo?.discounted ? priceInfo?.value : undefined;
  const name = product.name['en-US'] || 'No name';
  const description = product.description?.['en-US'];

  // console.log('parseProduct — name:', product.name['en-US']);

  return {
    id: product.id,
    name,
    description,
    imageUrl,
    images,
    price: formatPrice(currentPrice?.centAmount),
    originalPrice: formatPrice(originalPrice?.centAmount),
  };
}
