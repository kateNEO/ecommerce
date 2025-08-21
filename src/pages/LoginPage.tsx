import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { schemaForLogin } from '../utils/validation.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { getCustomerToken } from '../services/sdk/loginCustomer.ts';
import { Link /*Outlet*/ } from 'react-router-dom';
import { authStore } from '../store/store.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '../utils/paths.ts';

export type LoginData = z.infer<typeof schemaForLogin>;

function Login() {
  const navigate = useNavigate();
  const isAuthenticated = authStore((state) => state.isAuthenticated());

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

  const [loginError, setLoginError] = useState<string | null>(null);

  const submitHandler = async (formData: LoginData) => {
    try {
      const customer = await getCustomerToken(formData);
      console.log(customer);
      authStore.getState().login(customer);
      authStore.getState().updateUserOptions({
        userName: formData.email,
        password: formData.password,
      });
      navigate(ROUTES.HOME, { replace: true });
      setLoginError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unknown error occurred');
      }
    }
    console.log(authStore.getState().isAuthenticated());
  };
  console.log(isValid);
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT LOGIN</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
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
          <Button
            type="submit"
            text="Login"
            disabled={!isValid}
            className="h-14 text-white mt-6"
          />
          <p className="text-left text-sm leading-8 text-[#545454]">
            Don't have an account yet?
            <Link
              to={ROUTES.REGISTER}
              className="text-sm hover:underline text-[#545454] "
            >
              {' '}
              Register
            </Link>
          </p>
        </form>
        {loginError && (
          <p className="h-5 text-red-500 text-[16px]">{loginError}</p>
        )}
      </div>
    </div>
  );
}
export default Login;
