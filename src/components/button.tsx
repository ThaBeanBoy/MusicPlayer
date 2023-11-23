import { cn } from '../utils/cn';
import { forwardRef } from 'react';
export type ButtonProps = {
  label?: React.ReactNode;
  icon?: React.ReactElement;
  variant?: 'fill' | 'hollow' | 'flat';
  desctructive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      icon,
      variant = 'fill',
      desctructive = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(
        'bg-blue-500 border-blue-500 flex items-center justify-center gap-2 rounded-3xl border px-4 py-2 font-semibold capitalize text-white shadow-md',
        {
          // hollow variant
          'text-blue-500 bg-gray-100 ': variant === 'hollow',

          // icon only
          'h-10 w-10 rounded-2xl p-0': !label,

          //desctructive
          'border-red-500 bg-red-500': desctructive,

          // flat
          'text-blue-500 border-none bg-transparent border-0 shadow-none':
            variant === 'flat',

          'text-red-500':
            (desctructive && variant === 'hollow') ||
            (variant === 'flat' && desctructive),

          'brightness-75': disabled,
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {label} {icon}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
