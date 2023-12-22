import { NavLink } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';

export default function UploadPage() {
  return (
    <main className='grid grid-cols-2 gap-4'>
      <NavLink
        to=''
        className='capitalize border flex gap-4 items-center p-4 rounded-md transition hover:bg-blue-50 border-blue-400'
      >
        <FiUserPlus />
        <span>new artist</span>
      </NavLink>

      <NavLink
        to=''
        className='capitalize border flex gap-4 items-center p-4 rounded-md transition hover:bg-blue-50 border-blue-400'
      >
        <FiUserPlus />
        <span>new artist</span>
      </NavLink>

      <NavLink
        to=''
        className='capitalize border flex gap-4 items-center p-4 rounded-md transition hover:bg-blue-50 border-blue-400'
      >
        <FiUserPlus />
        <span>new artist</span>
      </NavLink>
    </main>
  );
}
