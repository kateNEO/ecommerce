import React from 'react';

type ButtonProps = {
  type: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  text: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
function Button({
  type,
  disabled = false,
  text,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-1/1 rounded-[7px] mt-2 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed ${disabled ? 'bg-gray-400 cursor-not-allowed hover:opacity-100' : 'bg-black hover:bg-gray-800, '} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
