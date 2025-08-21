import Button from '../components/button.tsx';
import ProfileValueItem from '../components/profile/ProfileValueItem.tsx';
import SavedAddressBlock from '../components/profile/SavedAddressBlock.tsx';
import { authStore } from '../store/store.ts';
import { useEffect, useState } from 'react';
import EditProfilePopup from '../components/profile/EditProfilePopup.tsx';
import PopupWrapper from '../components/profile/PopupWrapper.tsx';
import AddAddressPopup from '../components/profile/AddAddressPopup.tsx';
import { getAddressRole } from '../utils/getAdderessRoleFunc.ts';
import ChangePasswordPopup from '../components/profile/changePasswordPopup.tsx';
import { useStore } from 'zustand/react';
// import EditAddressPopup from '../components/profile/EditAddressPopup.tsx';

function ProfilePage() {
  //const currentCustomer: Customer | null = authStore.getState().customer;
  const [popup, setStateOpen] = useState<
    false | 'edit' | 'addAddress' | 'password' | 'verification'
  >(false);
  const currentCustomer = useStore(authStore, (state) => state.customer);
  useEffect(() => {
    if (popup) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [popup]);

  return (
    <div>
      {popup === 'edit' && (
        <PopupWrapper
          children={
            <EditProfilePopup
              handleEvent={() => {
                setStateOpen(false);
              }}
            />
          }
        />
      )}
      {popup === 'addAddress' && (
        <PopupWrapper
          children={
            <AddAddressPopup
              handleEvent={() => {
                setStateOpen(false);
              }}
            />
          }
        />
      )}
      {popup === 'password' && (
        <PopupWrapper
          children={
            <ChangePasswordPopup
              handleEvent={() => {
                setStateOpen(false);
              }}
            />
          }
        />
      )}
      <div className="max-w-[1440px] mx-auto py-12 flex flex-col items-center px-8 xl:px-40 md:items-start">
        <h2 className="text-2xl font-bold mb-10 ">My Profile</h2>
        <div className="flex flex-col w-1/1 md:flex-row gap-5">
          <div className="w-1/1 md:w-1/2">
            <h3 className="text-xl font-semibold mb-5">User Information</h3>
            <div className="flex flex-col min-w-[300px] w-1/1 space-y-4 border border-[#EBEBEB] rounded-[10px] p-[10px] mb-4">
              <ProfileValueItem label="Email:" value={currentCustomer?.email} />
              <ProfileValueItem
                label="First Name:"
                value={currentCustomer?.firstName}
              />
              <ProfileValueItem
                label="Last Name:"
                value={currentCustomer?.lastName}
              />
              <ProfileValueItem
                label="Date of birth:"
                value={currentCustomer?.dateOfBirth}
              />
            </div>

            <div className="flex justify-between gap-1 px-2 items-center">
              <ProfileValueItem label="Password:" value="********" />
              <Button
                text="Change"
                type="button"
                className="w-15 h-7 bg-white border border-[#9F9F9F] p-1 rounded-[7px] text-xs"
                onClick={() => setStateOpen('password')}
              />
            </div>
            <Button
              type="button"
              text="Edit Profile"
              className="mt-6 h-14 max-w-[200px] min-w-[100px] text-white md:ml-auto"
              onClick={() => setStateOpen('edit')}
            />
          </div>
          <div className="w-1/1 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Addresses</h3>
            <div className="flex flex-col min-w-[300px] w-1/1">
              {currentCustomer?.addresses.map((address) => (
                <SavedAddressBlock
                  key={address.id}
                  title={getAddressRole(address, currentCustomer)}
                  address={address}
                  customer={currentCustomer}
                  // onOpenPopup={() => setStateOpen('editAddress')}
                />
              ))}
            </div>
            <Button
              type="button"
              text="Add address"
              className="mt-6 h-14 max-w-[200px] min-w-[100px] text-white md:mr-auto"
              onClick={() => setStateOpen('addAddress')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
