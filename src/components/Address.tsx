import { RegistrationData } from '../pages/RegistrationPage.tsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import InputField from './inputField.tsx';

interface AddressFieldsProps {
  register: UseFormRegister<RegistrationData>;
  errors: FieldErrors<RegistrationData>;
  countries: string[];
  typeAddress: 'shippingAddress' | 'billingAddress';
}
export function Address({
  register,
  errors,
  countries,
  typeAddress,
}: AddressFieldsProps) {
  return (
    <div>
      <InputField
        register={register}
        label="Street"
        type="text"
        name={`${typeAddress}.streetName`}
        placeholder="street"
      />
      {errors[typeAddress]?.streetName && (
        <p className="h-5 text-red-500 text-[12px]">
          {errors[typeAddress].streetName.message}
        </p>
      )}
      <InputField
        register={register}
        label="City"
        type="text"
        name={`${typeAddress}.city`}
        placeholder="city"
      />
      {errors[typeAddress]?.city && (
        <p className="h-5 text-red-500 text-[12px]">
          {errors[typeAddress].city.message}
        </p>
      )}
      <label className="text-left text-sm leading-8 text-[#545454]">
        Country
      </label>
      <select
        id="country"
        className="border border-[#9F9F9F] w-full h-14 rounded-[7px] p-4 hover:cursor-pointer"
        {...register(`${typeAddress}.country`, { required: true })}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <InputField
        register={register}
        label="Postal code"
        type="text"
        name={`${typeAddress}.postalCode`}
        placeholder="postal code"
      />
      {errors[typeAddress]?.postalCode && (
        <p className="h-5 text-red-500 text-[12px]">
          {errors[typeAddress].postalCode.message}
        </p>
      )}
    </div>
  );
}
