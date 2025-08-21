import { authStore } from '../../store/store.ts';
import { Address } from '@commercetools/platform-sdk';
import { createApiRoot } from './loginCustomer.ts';

export type AddressAction =
  | 'setDefaultShippingAddress'
  | 'setDefaultBillingAddress'
  | 'removeAddress';

interface AddressActionInput {
  address: Address;
  action: AddressAction;
}

export async function updateCustomerAddress({
  address,
  action,
}: AddressActionInput): Promise<void> {
  const { customer, userOptions } = authStore.getState();

  if (!customer || !userOptions) return;

  const addressId = address.id;
  const { version } = customer;
  console.log(address.id);
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
              action,
              addressId,
            },
          ],
        },
      })
      .execute();

    if (res.statusCode === 200) {
      const updatedCustomer = res.body;
      authStore.getState().updateCustomer(updatedCustomer);
      console.log('Customer updated:', updatedCustomer);
    }
  } catch (error) {
    console.error('Update address error:', error);
  }
}
