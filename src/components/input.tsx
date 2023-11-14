import { Dispatch, SetStateAction, useState } from 'react';

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
