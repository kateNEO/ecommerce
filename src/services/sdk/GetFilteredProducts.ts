import { apiRoot } from './BuildClient';

export type Filters = {
  brand?: string[];
  color?: string[];
  model?: string[];
  minPrice?: number;
  maxPrice?: number;
};

//получение товаров по выбранным фильтрам
export async function getFilteredProducts(
  filters: Filters,
  limit = 9,
  sort?: string,
  searchQuery?: string,
  categoryId?: string,
  offset?: number
) {
  const filter: string[] = [];

  //бренд(brand)
  if (filters.brand?.length) {
    filter.push(
      `variants.attributes.brand:${filters.brand.map((b) => `"${b}"`).join(',')}`
    );
  }

  //цвет(color)
  if (filters.color?.length) {
    filter.push(
      `variants.attributes.color:${filters.color.map((c) => `"${c}"`).join(',')}`
    );
  }

  // Модель (model)
  if (filters.model?.length) {
    filter.push(
      `variants.attributes.model:${filters.model.map((m) => `"${m}"`).join(',')}`
    );
  }

  // Диапазон цены
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? 0;
    const max = filters.maxPrice ?? 999_999;
    filter.push(
      `masterVariant.price.centAmount:range(${min * 100} to ${max * 100})`
    );
  }

  // Категория
  if (categoryId) {
    filter.push(`categories.id: subtree("${categoryId}")`);
  }

  console.log('Commercetools filter predicates:', filter);

  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit,
          offset,
          filter: filter.length > 0 ? filter : undefined,
          sort: sort ? [sort] : undefined,
          [`text.en-US`]: searchQuery ? searchQuery : undefined,
          localeProjection: 'en-US',
        },
      })
      .execute();

    return {
      products: response.body.results,
      total: response.body.total,
    };
  } catch (error) {
    console.error('Error filtering products:', error);
    throw new Error('Не удалось загрузить товары. Попробуйте позже');
  }
}
