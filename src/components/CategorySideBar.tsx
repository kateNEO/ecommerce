import { Link } from 'react-router-dom';
import { getCategories } from '../services/sdk/getCategories';
import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';

export function CategorySideBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => console.error('Ошибка загрузки категорий', e));
  }, []);
  return (
    <aside>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/catalog/${category.slug['en-US']}`}>
              {category.name['en-US']}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
