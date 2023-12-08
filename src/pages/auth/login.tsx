import { FormEvent } from 'react';
import Input, { useInput } from '../../components/input';
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md';
import Button from '../../components/button';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import supabase from '../../backend/supabase';

export default function Login() {
  const emailInput = useInput();
  const passwordInput = useInput();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput.value,
      password: passwordInput.value,
    });

    if (error) {
      alert('Something went wrong');
      console.error(error);
    }

    console.log(data);
  };

  return (
    <main className='w-full max-w-lg'>
      <h1 className='text-3xl font-bold text-center mb-6'>Login</h1>
      <form
        onSubmit={handleLogin}
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
          wrapperClassname='max-w-none col-span-2'
          icon={<MdOutlineLock />}
          required
          {...passwordInput.inputProps}
        />

        <Button
          type='submit'
          className='mt-2 w-full col-span-2'
          label='sign up'
          disabled={!emailInput.valid || !passwordInput.valid}
        />
      </form>
      <p className='text-center text-gray-600 text-sm mt-2 mb-6'>
        Don't have an account?{' '}
        <NavLink to='/auth/sign-up'>Sign up now.</NavLink>
      </p>

      <div className='flex flex-col items-center gap-4 text-sm text-gray-500'>
        <p className='border-b pb-2'>or login with</p>
        <div className='flex gap-2 justify-center'>
          <Button icon={<FaFacebookF />} variant='hollow' />
          <Button icon={<FcGoogle />} variant='hollow' />
          <Button icon={<FaTwitter />} variant='hollow' />
        </div>
      </div>
    </main>
  );
}
