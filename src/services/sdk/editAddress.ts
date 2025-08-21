import { AddressValidation } from '../../components/profile/AddAddressPopup.tsx';
import { authStore } from '../../store/store.ts';
import { createApiRoot } from './loginCustomer.ts';
import { Address } from '@commercetools/platform-sdk';
import { countryMap } from '../../utils/mapRegistrationData.ts';

export async function editCustomerAddress(
  getValues: () => AddressValidation,
  oldAddress: Address,
  onClose: () => void
) {
  const { customer, userOptions } = authStore.getState();
  const data = getValues();
  const addressId = oldAddress.id;
  if (!customer || !userOptions) return;
  const { version } = customer;
  console.log(addressId);
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
          version,
          actions: [
            {
              action: 'changeAddress',
              addressId,
              address: newAddress,
            },
          ],
        },
      })
      .execute();

    if (res.statusCode === 200) {
      console.log(res.body);
      authStore.getState().updateCustomer(res.body);
      onClose();
    }
  } catch (error) {
    console.error('Edit address error:', error);
  }
}
