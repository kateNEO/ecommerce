import { EditValidation } from '../../components/profile/EditProfilePopup.tsx';
import { authStore } from '../../store/store.ts';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { createApiRoot } from './loginCustomer.ts';

export async function updateCustomer(
  data: EditValidation,
  closePopup: () => void
) {
  const { customer, userOptions } = authStore.getState();
  if (!customer || !userOptions) return;
  const { version } = customer;

  const actions: MyCustomerUpdateAction[] = [
    { action: 'changeEmail', email: data.email },
    { action: 'setFirstName', firstName: data.firstName },
    { action: 'setLastName', lastName: data.lastName },
    { action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth },
  ];

  try {
    const res = await createApiRoot({
      email: userOptions.userName,
      password: userOptions.password,
    })
      .me()
      .post({ body: { version, actions } })
      .execute();

    if (res.statusCode === 200) {
      authStore.getState().updateCustomer(res.body);
      closePopup();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }
  }
}

// function updateSavedCustomer(data: EditValidation) {
//   authStore.getState().updateCustomer({
//     email: data.email,
//     firstName: data.firstName,
//     lastName: data.lastName,
//     dateOfBirth: data.dateOfBirth,
//   });
// }
