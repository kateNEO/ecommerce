import { apiRoot } from './BuildClient';

export async function getAvailableFilters() {
  const res = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 200,
        localeProjection: 'en-US',
      },
    })
    .execute();

  const products = res.body.results;

  const filterSets: { [key: string]: Set<string> } = {
    brand: new Set(),
    color: new Set(),
    model: new Set(),
  };

  for (const product of products) {
    const attrs = product.masterVariant.attributes;

    attrs?.forEach((attr) => {
      let value: string | undefined;

      if (typeof attr.value === 'object') {
        value = attr.value.key || attr.value.label || attr.value.name;
      } else {
        value = attr.value;
      }

      if (value && attr.name in filterSets) {
        filterSets[attr.name].add(value);
      }
    });
  }

  return {
    brand: Array.from(filterSets.brand).sort(),
    color: Array.from(filterSets.color).sort(),
    model: Array.from(filterSets.model).sort(),
  };
}
