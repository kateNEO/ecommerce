import InputField from '../inputField.tsx';
import { z } from 'zod';
import { schemaForPasswordOnly } from '../../utils/validation.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../button.tsx';
import { useState } from 'react';
import PopupWrapper from './PopupWrapper.tsx';
import UserVerificationPopup from './UserVerificationPopup.tsx';
import { updatePassword } from '../../services/sdk/updatePassword.ts';

export type PasswordValidation = z.infer<typeof schemaForPasswordOnly>;

function ChangePasswordPopup({ handleEvent }: { handleEvent: () => void }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<PasswordValidation>({
    resolver: zodResolver(schemaForPasswordOnly),
    mode: 'onChange',
  });
  const [showVerification, setShowVerification] = useState(false);
  const [changePasswordError, setPasswordError] = useState<string | null>(null);
  const verification = () => {
    setShowVerification(true);
  };
  console.log(getValues());
  // const savedCustomer = authStore.getState().customer;
  return (
    <div>
      <p className="text-xl font-semibold mb-5 text-center">
        Enter new password
      </p>
      <form onSubmit={handleSubmit(verification)}>
        <InputField
          // defaultValue={'********'}
          register={register}
          label="Password"
          name="password"
          type="password"
          placeholder=""
        />
        {errors.password && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.password.message}
          </p>
        )}
        <div className="flex justify-between mt-5">
          <Button
            type="submit"
            text="Enter"
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
      </form>
      {changePasswordError && (
        <p className="h-5 text-red-500 text-[16px] mt-4 text-center">
          {changePasswordError}
        </p>
      )}
      {showVerification && (
        <PopupWrapper>
          <UserVerificationPopup
            onClose={() => {
              setShowVerification(false);
            }}
            onUpdate={() => {
              updatePassword(getValues, handleEvent).catch((err) =>
                setPasswordError(err.message)
              );
            }}
          />
        </PopupWrapper>
      )}
    </div>
  );
}

export default ChangePasswordPopup;
