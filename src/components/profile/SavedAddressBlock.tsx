import ProfileValueItem from './ProfileValueItem.tsx';
import { Address, Customer } from '@commercetools/platform-sdk';
import Button from '../button.tsx';
import { updateCustomerAddress } from '../../services/sdk/changeRoleAddress.ts';
import type { AddressAction } from '../../services/sdk/changeRoleAddress.ts';
import { useRef, useState } from 'react';
import { authStore } from '../../store/store.ts';
// import { addNewAddress } from '../../services/sdk/addNewAddress.ts';
import PopupWrapper from './PopupWrapper.tsx';
import UserVerificationPopup from './UserVerificationPopup.tsx';
import EditAddressPopup from './EditAddressPopup.tsx';

function SavedAddressBlock({
  title,
  address,
  customer,
}: {
  key?: string;
  title?: string;
  address: Address;
  customer: Customer;
  // onOpenPopup: () => void;
}) {
  // console.log(address.id);
  // console.log(customer.defaultShippingAddressId);
  const [showVerification, setShowVerification] = useState(false);
  const [showEditAddressPopup, setShowEditAddressPopup] = useState(false);
  // const [action, setRole] = useState<AddressAction>('setDefaultShippingAddress');
  const pendingAction = useRef<AddressAction>('setDefaultShippingAddress');
  const preChange = (address: Address, action: AddressAction) => {
    if (authStore.getState().userOptions === null) {
      setShowVerification(true);
    } else {
      updateCustomerAddress({ address, action });
    }
  };
  return (
    <div className="border border-[#EBEBEB] rounded-[10px] p-[10px] mb-4">
      {title && <h4 className="font-medium mb-2">{title}</h4>}
      <div className="flex flex-col gap-2 mb-6">
        <ProfileValueItem label="Country" value={address.country} />
        <ProfileValueItem label="Street:" value={address.streetName} />
        <ProfileValueItem label="City:" value={address.city} />
        <ProfileValueItem label="Postal Code:" value={address.postalCode} />
      </div>
      <Button
        text="Edit"
        type="button"
        className="w-15 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
        onClick={() => setShowEditAddressPopup(true)}
      />
      <Button
        text="Delete"
        type="button"
        className="w-15 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
        onClick={() => {
          pendingAction.current = 'removeAddress';
          preChange(address, pendingAction.current);
        }}
      />
      {address.id !== customer.defaultShippingAddressId && (
        <Button
          text="Make as default Shipping"
          type="button"
          className="w-40 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
          onClick={() => {
            pendingAction.current = 'setDefaultShippingAddress';
            preChange(address, pendingAction.current);
          }}
        />
      )}
      {address.id !== customer.defaultBillingAddressId && (
        <Button
          text="Make as default Billing"
          type="button"
          className="w-40 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
          onClick={() => {
            pendingAction.current = 'setDefaultBillingAddress';
            preChange(address, pendingAction.current);
          }}
        />
      )}
      {showEditAddressPopup && (
        <PopupWrapper
          children={
            <EditAddressPopup
              data={address}
              handleEvent={() => {
                setShowEditAddressPopup(false);
              }}
            />
          }
        />
      )}
      {showVerification && (
        <PopupWrapper
          children={
            <UserVerificationPopup
              onClose={() => setShowVerification(false)}
              onUpdate={() =>
                updateCustomerAddress({
                  address,
                  action: pendingAction.current,
                })
              }
            />
          }
        />
      )}
    </div>
  );
}

export default SavedAddressBlock;
