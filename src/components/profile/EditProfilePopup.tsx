import { schemaForEditUserInfo } from '../../utils/validation.ts';
import { z } from 'zod';
import InputField from '../inputField.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../button.tsx';
import { authStore } from '../../store/store.ts';
import { updateCustomer } from '../../services/sdk/updateCustomerInformation.ts';
import { useState } from 'react';
import PopupWrapper from './PopupWrapper.tsx';
import UserVerificationPopup from './UserVerificationPopup.tsx';

export type EditValidation = z.infer<typeof schemaForEditUserInfo>;
function EditProfilePopup({ handleEvent }: { handleEvent: () => void }) {
  const savedCustomer = authStore.getState().customer;
  console.log(savedCustomer);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<EditValidation>({
    resolver: zodResolver(schemaForEditUserInfo),
    mode: 'onChange',
  });
  const [showVerification, setShowVerification] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const preSubmit = () => {
    console.log(authStore.getState().userOptions);
    if (authStore.getState().userOptions === null) {
      setShowVerification(true);
    } else {
      updateUserInformation();
    }
  };

  const updateUserInformation = () => {
    const data = getValues();
    updateCustomer(data, handleEvent)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
        setUpdateError('error');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(preSubmit)} className="flex flex-col gap-4">
        <InputField
          defaultValue={savedCustomer?.email}
          register={register}
          label="Email"
          name="email"
          type="text"
          placeholder=""
        />
        {errors.email && (
          <p className="h-5 text-red-500 text-[12px]">{errors.email.message}</p>
        )}
        <InputField
          defaultValue={savedCustomer?.firstName}
          register={register}
          label="First Name"
          name="firstName"
          type="text"
          placeholder=""
        />
        {errors.firstName && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.firstName.message}
          </p>
        )}
        <InputField
          defaultValue={savedCustomer?.lastName}
          register={register}
          label="Last Name"
          name="lastName"
          type="text"
          placeholder=""
        />
        {errors.lastName && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.lastName.message}
          </p>
        )}
        <InputField
          defaultValue={savedCustomer?.dateOfBirth}
          register={register}
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          placeholder=""
        />
        {errors.dateOfBirth && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.dateOfBirth.message}
          </p>
        )}
        <div className="flex justify-between gap-3">
          <Button
            type="submit"
            text="Save Changes"
            disabled={!isValid}
            className="max-w-[150px] min-w-[80px] h-14 text-white"
          />
          <Button
            type="button"
            text="Cancel Changes"
            onClick={handleEvent}
            className="max-w-[150px] min-w-[80px] h-14 bg-white text-[#9F9F9F]  border border-[#EBEBEB]"
          />
        </div>
        {updateError && (
          <p className="h-5 text-red-500 text-[16px] mt-4 text-center">
            {updateError}
          </p>
        )}
      </form>
      {showVerification && (
        <PopupWrapper>
          <UserVerificationPopup
            onClose={() => {
              setShowVerification(false);
            }}
            onUpdate={() => {
              updateUserInformation();
            }}
          />
        </PopupWrapper>
      )}
    </div>
  );
}

export default EditProfilePopup;
