import { useForm } from 'react-hook-form';
import { authStore } from '../../store/store.ts';
import { LoginData } from '../../pages/LoginPage.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaForLogin } from '../../utils/validation.ts';
import InputField from '../inputField.tsx';
import Button from '../button.tsx';
import { verifyCredentials } from '../../services/sdk/verification.ts';
import { useState } from 'react';

type Props = {
  onUpdate: () => void;
  onClose: () => void;
};

function UserVerificationPopup({ onClose, onUpdate }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    mode: 'onChange',
    resolver: zodResolver(schemaForLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const CheckData = async (data: { email: string; password: string }) => {
    const store = authStore.getState();
    if (data.email === store.customer?.email) {
      const res = await verifyCredentials(data.email, data.password);
      if (res) {
        store.updateUserOptions({
          userName: data.email,
          password: data.password,
        });
        onClose();
        onUpdate();
      } else {
        setVerificationError('Wrong password');
      }
    } else {
      setVerificationError('Wrong email');
    }
  };

  return (
    <form onSubmit={handleSubmit(CheckData)}>
      <p className="text-xl font-semibold mb-5 text-center">
        Enter your current login and password
      </p>
      <InputField
        register={register}
        label="Email"
        type="text"
        name="email"
        placeholder="example@example.com"
      />
      {errors.email && (
        <p className="h-5 text-red-500 text-[12px]">{errors.email.message}</p>
      )}
      <InputField
        register={register}
        label="Password"
        type="password"
        name="password"
        placeholder="password..."
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
          onClick={onClose}
          className="max-w-[150px] min-w-[80px] h-14 bg-white text-[#9F9F9F]  border border-[#EBEBEB]"
        />
      </div>
      {verificationError && (
        <p className="h-5 text-red-500 text-[16px] mt-4 text-center">
          {verificationError}
        </p>
      )}
    </form>
  );
}
export default UserVerificationPopup;
