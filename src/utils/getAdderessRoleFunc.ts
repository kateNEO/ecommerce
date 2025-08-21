import { Address, Customer } from '@commercetools/platform-sdk';

export function getAddressRole(address: Address, customer: Customer): string {
  const isDefaultShipping = customer.defaultShippingAddressId === address.id;
  const isDefaultBilling = customer.defaultBillingAddressId === address.id;

  if (isDefaultShipping && isDefaultBilling) {
    return 'Default Shipping & Billing Address';
  } else if (isDefaultShipping) {
    return 'Default Shipping Address';
  } else if (isDefaultBilling) {
    return 'Default Billing Address';
  }
  return '';
}
