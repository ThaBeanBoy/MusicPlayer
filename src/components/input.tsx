import { Dispatch, SetStateAction, forwardRef, useState } from 'react';
import { cn } from '../utils/cn';

export type InputProps = {
  icon?: React.ReactElement;
  wrapperClassname?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, wrapperClassname, ...props }, ref) => (
    <div className={cn('relative max-w-xs', wrapperClassname)}>
      <input
        type='text'
        placeholder='search'
        className={cn(
          'border rounded-lg px-3 py-2 text-sm outline-none w-full focus:border-blue-500',
          { 'pr-7': icon },
          className
        )}
        ref={ref}
        {...props}
      />
      {<div className='absolute top-1/2 right-2 -translate-y-1/2'>{icon}</div>}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;

export type updateableInputType = {
  value: string;
  valueIsEmpty: boolean;
  set: Dispatch<SetStateAction<string>>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export function useInput(): updateableInputType {
  const [value, setValue] = useState('');

  return {
    value: value.trim(),
    valueIsEmpty: value.trim() === '',
    set: setValue,
    inputProps: {
      onChange(e) {
        setValue(e.target.value);
      },
      value,
    },
  };
}
