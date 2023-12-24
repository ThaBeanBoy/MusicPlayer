import {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import * as Tooltip from '@radix-ui/react-tooltip';

import { BiMessageSquareError } from 'react-icons/bi';

import { cn } from '../utils/cn';
import { emailCheck, requiredCheck } from '../utils/checkTemplates';

export type inputCheckType = {
  message: ReactNode;
  check: (input: string) => boolean;
};

export type InputProps = {
  icon?: React.ReactElement;
  label?: ReactNode;
  wrapperClassname?: string;
  checks?: inputCheckType[];
  setValid?: Dispatch<SetStateAction<boolean>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      checks = [],
      id,
      className,
      onChange,
      icon,
      required,
      wrapperClassname,
      type,
      defaultValue = '',
      setValid,
      ...props
    },
    ref
  ) => {
    const [displayChecks, setDisplayChecks] = useState(false);
    const [checksToDisplay, setChecksToDisplay] = useState<inputCheckType[]>(
      []
    );

    checks = type === 'email' ? [emailCheck, ...checks] : checks;
    checks = required ? [requiredCheck, ...checks] : checks;

    useEffect(() => {
      setChecksToDisplay(
        checks.filter(({ check }) => check(defaultValue.toString()))
      );
    }, []);

    useEffect(() => {
      if (setValid) setValid(checksToDisplay.length === 0);
    }, [checksToDisplay, setValid]);

    return (
      <div className={cn('max-w-xs', wrapperClassname)}>
        {label && (
          <label
            className={cn('text-xs capitalize pl-3', {
              "after:content-['*'] after:ml-0.5 after:text-red-500": required,
            })}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className='relative'>
          <input
            type={type}
            defaultValue={defaultValue}
            className={cn(
              'border rounded-lg px-3 py-2 text-sm outline-none w-full focus:border-blue-500',
              {
                'pr-7': (displayChecks && checksToDisplay.length > 0) || icon,
              },
              className
            )}
            onChange={(e) => {
              setChecksToDisplay(
                checks.filter(({ check }) =>
                  check(e.currentTarget.value.trim())
                )
              );

              if (setValid) {
                setValid(checksToDisplay.length === 0);
              }

              if (onChange) onChange(e);
            }}
            onBlur={() => setDisplayChecks(true)}
            ref={ref}
            required={required}
            {...props}
          />
          <div className='absolute top-1/2 right-2 -translate-y-1/2'>
            {displayChecks && checksToDisplay.length > 0 ? (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button>
                      <BiMessageSquareError className='text-red-600' />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side='right'
                      className='max-w-sm z-[1000] w-60 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade border-red-600 border data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-white px-[15px] py-[10px] text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
                    >
                      <ul>
                        {checksToDisplay.map(({ message }, key) => (
                          <li
                            className='
                          mb-3 last:mb-0 text-xs
                          '
                            key={key}
                          >
                            {message}
                          </li>
                        ))}
                      </ul>
                      <Tooltip.Arrow className='fill-red-600' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              icon
            )}
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

export type updateableInputType = {
  value: string;
  valueIsEmpty: boolean;
  valid: boolean;
  set: Dispatch<SetStateAction<string>>;
  inputProps: InputProps;
};

export function useInput(checks?: inputCheckType[]): updateableInputType {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);

  return {
    value: value.trim(),
    valueIsEmpty: value.trim() === '',
    set: setValue,
    valid,
    inputProps: {
      onChange(e) {
        setValue(e.target.value);
      },
      setValid,
      value,
      checks,
    },
  };
}
