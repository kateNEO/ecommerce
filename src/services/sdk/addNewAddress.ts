import { AddressValidation } from '../../components/profile/AddAddressPopup.tsx';
import { createApiRoot } from './loginCustomer.ts';
import { authStore } from '../../store/store.ts';
import { countryMap } from '../../utils/mapRegistrationData.ts';

export async function addNewAddress(
  getValues: () => AddressValidation,
  onClose: () => void
) {
  const data = getValues();
  const { customer, userOptions } = authStore.getState();
  if (!customer || !userOptions) return;
  const newAddress = {
    streetName: data.streetName,
    postalCode: data.postalCode,
    city: data.city,
    country: countryMap[data.country],
  };
  try {
    const res = await createApiRoot({
      email: userOptions.userName,
      password: userOptions.password,
    })
      .me()
      .post({
        body: {
          version: customer.version,
          actions: [
            {
              action: 'addAddress',
              address: newAddress,
            },
          ],
        },
      })
      .execute();
    if (res.statusCode === 200) {
      const updatedCustomer = res.body;
      authStore.getState().updateCustomer(updatedCustomer);
      onClose();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }
  }
}
