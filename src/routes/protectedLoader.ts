import { redirect } from 'react-router-dom';
import { authStore } from '../store/store';
import { ROUTES } from '../utils/paths.ts';

export function protectedLoader() {
  const isAuthenticated = authStore.getState().isAuthenticated();

  if (!isAuthenticated) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}
