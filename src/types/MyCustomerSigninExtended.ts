import type { MyCustomerSignin } from '@commercetools/platform-sdk';

export interface MyCustomerSigninExtended extends MyCustomerSignin {
  anonymousId?: string;
}
