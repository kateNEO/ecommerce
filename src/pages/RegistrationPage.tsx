import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { CountryEnum, schemaForRegistration } from '../utils/validation.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerAction } from '../routes/registrationAction.ts';
import { useEffect, useState } from 'react';
import { Address } from '../components/Address.tsx';
import { ROUTES } from '../utils/paths.ts';
import { authStore } from '../store/store.ts';

export type RegistrationData = z.infer<typeof schemaForRegistration>;
function Registration() {
  const [regError, setRegError] = useState<string | null>(null);
  const [hideBilling, setHideBilling] = useState(true);
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<RegistrationData>({
    mode: 'onChange',
    shouldUnregister: true,
    resolver: zodResolver(schemaForRegistration),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      shippingAddress: {
        streetName: '',
        city: '',
        country: CountryEnum.options[0],
        postalCode: '',
      },
      saveAsBilling: true,
    },
  });
  const navigate = useNavigate();
  const registrationCustomer = async (formData: RegistrationData) => {
    try {
      await registerAction(formData, navigate);
      console.log(authStore.getState().userOptions);
      setRegError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRegError(error.message);
      } else {
        setRegError('An unknown error occurred');
      }
    }
  };
  useEffect(() => {
    if (hideBilling) {
      setValue('billingAddress', undefined, { shouldValidate: true });
      unregister('billingAddress');
    } else {
      setValue(
        'billingAddress',
        {
          streetName: '',
          city: '',
          country: 'United States (US)',
          postalCode: '',
        },
        { shouldValidate: true }
      );
    }
  }, [hideBilling, unregister, setValue]);

  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT REGISTRATION</h2>
        <form onSubmit={handleSubmit(registrationCustomer)}>
          <InputField
            register={register}
            label="Email"
            type="text"
            name="email"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.email.message}
            </p>
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
          <InputField
            register={register}
            label="First name"
            type="text"
            name="firstName"
            placeholder="first name"
          />
          {errors.firstName && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.firstName.message}
            </p>
          )}
          <InputField
            register={register}
            label="Last name"
            type="text"
            name="lastName"
            placeholder="last name"
          />
          {errors.lastName && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.lastName.message}
            </p>
          )}
          <InputField
            register={register}
            label="Date of birth"
            type="date"
            name="dateOfBirth"
            placeholder="MM/DD/YYYY"
          />
          {errors.dateOfBirth && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.dateOfBirth.message}
            </p>
          )}
          <h2 className="font-bold text-xl mb-10 mt-10">SHIPPING ADDRESS</h2>
          <Address
            register={register}
            errors={errors}
            countries={CountryEnum.options}
            typeAddress="shippingAddress"
          />
          <input
            type="checkbox"
            id="saveAsBilling"
            {...register('saveAsBilling')}
            className="w-4 h-4 mt-6 mr-2"
            onChange={(e) => {
              setHideBilling(!hideBilling);
              setValue('saveAsBilling', e.target.checked, {
                shouldValidate: true,
              });
            }}
          />
          <label className="text-left text-sm leading-8 text-[#545454]">
            Make as default billing address
          </label>
          {!hideBilling && (
            <div>
              <h2 className="font-bold text-xl mb-10 mt-10">BILLING ADDRESS</h2>
              <Address
                register={register}
                errors={errors}
                countries={CountryEnum.options}
                typeAddress="billingAddress"
              />
            </div>
          )}
          <Button
            text="Sing Up"
            type="submit"
            disabled={!isValid}
            className="h-14 text-white mt-6"
          />
          <p className="text-left text-sm leading-8 text-[#545454]">
            If you have an account yet{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-sm hover:underline text-[#545454] "
            >
              Login
            </Link>
          </p>
        </form>
        {regError && <p className="h-5 text-red-500 text-[16px]">{regError}</p>}
      </div>
    </div>
  );
}

export default Registration;
