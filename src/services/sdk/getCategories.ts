import { apiRoot } from './BuildClient';

export async function getCategories() {
  const response = await apiRoot
    .categories()
    .get({ queryArgs: { limit: 10 } })
    .execute();

  console.log('Categories from get categories', response);
  return response.body.results;
}
