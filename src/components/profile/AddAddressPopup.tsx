import InputField from '../inputField.tsx';
import { useForm } from 'react-hook-form';
import { CountryEnum, schemaForAddress } from '../../utils/validation.ts';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../button.tsx';
import { useState } from 'react';
import { authStore } from '../../store/store.ts';
import PopupWrapper from './PopupWrapper.tsx';
import UserVerificationPopup from './UserVerificationPopup.tsx';
import { addNewAddress } from '../../services/sdk/addNewAddress.ts';
export type AddressValidation = z.infer<typeof schemaForAddress>;
function AddAddressPopup({ handleEvent }: { handleEvent: () => void }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<AddressValidation>({
    resolver: zodResolver(schemaForAddress),
    mode: 'onChange',
  });
  const [showVerification, setShowVerification] = useState(false);

  const preAdd = () => {
    if (authStore.getState().userOptions === null) {
      setShowVerification(true);
    } else {
      addNewAddress(getValues, handleEvent);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(preAdd)} className="flex flex-col gap-4">
        <InputField
          register={register}
          label="Street"
          type="text"
          name="streetName"
          placeholder="street"
        />
        {errors.streetName && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.streetName.message}
          </p>
        )}
        <InputField
          register={register}
          label="City"
          type="text"
          name="city"
          placeholder="city"
        />
        {errors.city && (
          <p className="h-5 text-red-500 text-[12px]">{errors.city.message}</p>
        )}
        <label className="text-left text-sm leading-8 text-[#545454]">
          Country
        </label>
        <select
          id="country"
          className="border border-[#9F9F9F] w-full h-14 rounded-[7px] p-4 hover:cursor-pointer"
          {...register('country', { required: true })}
        >
          {CountryEnum.options.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <InputField
          register={register}
          label="Postal code"
          type="text"
          name="postalCode"
          placeholder="postal code"
        />
        {errors.postalCode && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.postalCode.message}
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
      </form>
      {showVerification && (
        <PopupWrapper>
          <UserVerificationPopup
            onClose={() => {
              setShowVerification(false);
            }}
            onUpdate={() => {
              addNewAddress(getValues, handleEvent);
            }}
          />
        </PopupWrapper>
      )}
    </div>
  );
}

export default AddAddressPopup;
