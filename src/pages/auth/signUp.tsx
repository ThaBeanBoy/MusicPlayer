import { FormEvent } from 'react';

import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Button from '../../components/button';
import Input, { useInput } from '../../components/input';
import { NavLink } from 'react-router-dom';
import { passwordChecks } from '../../utils/checkTemplates';

export default function SignUp() {
  const emailInput = useInput();
  const passwordInput = useInput(passwordChecks);
  const confirmPasswordInput = useInput([
    {
      message: "Confirmation password doesn't match password",
      check(input) {
        return input !== passwordInput.value;
      },
    },
  ]);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(emailInput);
    console.log(passwordInput);
  };

  return (
    <main className='w-full max-w-lg'>
      <h1 className='text-3xl font-bold mb-6'>Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        className='w-full flex flex-col sm:grid grid-cols-2 gap-2'
      >
        <Input
          type='email'
          label='email'
          wrapperClassname='max-w-none col-span-2'
          icon={<MdOutlineEmail />}
          required
          {...emailInput.inputProps}
        />

        <Input
          type='password'
          label='password'
          wrapperClassname='max-w-none'
          icon={<MdOutlineLock />}
          required
          {...passwordInput.inputProps}
        />

        <Input
          type='password'
          label='confirm password'
          wrapperClassname='max-w-none'
          icon={<MdOutlineLock />}
          required
          {...confirmPasswordInput.inputProps}
        />

        <Button
          type='submit'
          className='mt-2 w-full col-span-2'
          label='sign up'
          disabled={
            !emailInput.valid ||
            !passwordInput.valid ||
            confirmPasswordInput.value !== passwordInput.value
          }
        />
      </form>
      <p className='text-center text-gray-600 text-sm mt-2 mb-6'>
        Already have an account? <NavLink to='/auth/'>Login now.</NavLink>
      </p>

      <div className='flex flex-col items-center gap-4 text-sm text-gray-500'>
        <p className='border-b pb-2'>or sign up with</p>
        <div className='flex gap-2 justify-center'>
          <Button icon={<FaFacebookF />} variant='hollow' />
          <Button icon={<FcGoogle />} variant='hollow' />
          <Button icon={<FaTwitter />} variant='hollow' />
        </div>
      </div>
    </main>
  );
}
