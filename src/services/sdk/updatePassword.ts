import { createApiRoot } from './loginCustomer.ts';
import { authStore } from '../../store/store.ts';

export async function updatePassword(
  getValue: () => { password: string },
  onClosePopup: () => void
) {
  const userOptions = authStore.getState().userOptions;
  const customer = authStore.getState().customer;
  const newPassword = getValue().password;
  if (!userOptions || !customer) return;
  console.log(newPassword);
  try {
    const res = await createApiRoot({
      email: userOptions.userName,
      password: userOptions.password,
    })
      .me()
      .password()
      .post({
        body: {
          version: customer.version,
          currentPassword: userOptions.password,
          newPassword,
        },
      })
      .execute();
    if (res.statusCode === 200) {
      const updatedCustomer = res.body;
      authStore.getState().updateCustomer(updatedCustomer);
      authStore.getState().updateUserOptions({
        userName: customer.email,
        password: newPassword,
      });
      onClosePopup();
    }
  } catch (error) {
    console.error('Password update failed', error);
    throw error;
  }
}
