import { JSX, useState } from 'react';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';
import ShownIcon from '../assets/icons/eye-on.svg?react';
import NotShownIcon from '../assets/icons/eye-off.svg?react';

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  defaultValue?: string;
};

export function InputField<T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  register,
  defaultValue,
}: InputFieldProps<T>): JSX.Element {
  const [isShownPassword, setShowPassword] = useState(false);
  const isPassword: boolean = type === 'password';
  const inputType: string = isPassword && isShownPassword ? 'text' : type;

  return (
    <div className="flex flex-col mt-1.5">
      <label className="text-left text-sm leading-8 text-[#545454]">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={inputType}
          className="border border-[#9F9F9F] w-full h-14 rounded-[7px] p-4 hover:cursor-pointer"
          {...register(name)}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((val) => !val)}
            className="absolute top-1/2 right-2.5 transform -translate-y-1/2 focus:outline-none "
          >
            {isShownPassword ? (
              <NotShownIcon
                className="h-5 w-5 focus:outline-none"
                focusable="false"
                tabIndex={-1}
              />
            ) : (
              <ShownIcon
                className="h-5 w-5 focus:outline-none"
                focusable="false"
                tabIndex={-1}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputField;
