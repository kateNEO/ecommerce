export function getCreateAnonymousId(): string {
  const key = 'ct_anonymous_id';

  const isCustomer = !!localStorage.getItem('customer');
  if (isCustomer) return '';

  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
