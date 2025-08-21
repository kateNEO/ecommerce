import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CountryEnum, schemaForAddress } from '../../utils/validation.ts';
import { useState } from 'react';
import { authStore } from '../../store/store.ts';
import InputField from '../inputField.tsx';
import Button from '../button.tsx';
import PopupWrapper from './PopupWrapper.tsx';
import UserVerificationPopup from './UserVerificationPopup.tsx';
import { AddressValidation } from './AddAddressPopup.tsx';
import { Address } from '@commercetools/platform-sdk';
import { getFullNameCountry } from '../../utils/mapRegistrationData.ts';
import { editCustomerAddress } from '../../services/sdk/editAddress.ts';

function EditAddressPopup({
  data,
  handleEvent,
}: {
  data: Address;
  handleEvent: () => void;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<AddressValidation>({
    resolver: zodResolver(schemaForAddress),
    mode: 'onChange',
    defaultValues: {
      country: getFullNameCountry(data.country),
    },
  });
  const [showVerification, setShowVerification] = useState(false);
  //if(!data.id) return
  const preEdit = () => {
    //const newData = getValues();
    // const addressId = data.id;
    // if (!addressId) return;
    // console.log(newData);
    // console.log(addressId);

    if (authStore.getState().userOptions === null) {
      setShowVerification(true);
    } else {
      editCustomerAddress(getValues, data, handleEvent);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(preEdit)} className="flex flex-col gap-4">
        <InputField
          defaultValue={data.streetName}
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
          defaultValue={data.city}
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
          defaultValue={data.country}
          id="country"
          className="border border-[#9F9F9F] w-full h-14 rounded-[7px] p-4 hover:cursor-pointer"
          {...register('country', { required: true })}
        >
          {CountryEnum.options.map((country) => (
            <option key={country} value={country} defaultValue={data.country}>
              {country}
            </option>
          ))}
        </select>
        <InputField
          defaultValue={data.postalCode}
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
              editCustomerAddress(getValues, data, handleEvent);
            }}
          />
        </PopupWrapper>
      )}
    </div>
  );
}

export default EditAddressPopup;
