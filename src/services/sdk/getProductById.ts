import { apiRoot } from './BuildClient';

export async function getProductById(id: string) {
  const res = await apiRoot
    .productProjections()
    .withId({ ID: id })
    .get({
      queryArgs: {
        expand: ['categories[*]'],
      },
    })
    .execute();
  return res.body;
}
