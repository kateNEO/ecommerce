import { registerCustomer } from '../services/sdk/registerCustomer';
import { NavigateFunction } from 'react-router-dom'; // для навигации на main
import { authStore } from '../store/store';
import { RegistrationData } from '../pages/RegistrationPage.tsx';
import { mapRegistrationData } from '../utils/mapRegistrationData.ts';
import { getCustomerToken } from '../services/sdk/loginCustomer';
import { ROUTES } from '../utils/paths.ts';

export async function registerAction(
  formData: RegistrationData,
  navigate: NavigateFunction
) {
  const mappedData = mapRegistrationData(formData);
  await registerCustomer(mappedData);
  const { email, password } = formData;
  const result = await getCustomerToken({ email, password });
  console.log(result);
  authStore.getState().login(result);
  authStore.getState().updateUserOptions({
    userName: formData.email,
    password: formData.password,
  });
  navigate(ROUTES.HOME, { replace: true }); // убрал main в navigate
}
