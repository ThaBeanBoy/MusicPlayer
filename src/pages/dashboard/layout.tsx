import { NavLink, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className='max-w-6xl mx-auto flex min-h-full gap-4'>
      <aside className='w-full max-w-[240px]'>
        <nav className='capitalize flex flex-col gap-3 pr-2 border-r h-full'>
          <NavLink to=''>my profile</NavLink>
          <NavLink to='playlist'>my playlists</NavLink>
          <NavLink to='artists'>artists</NavLink>
          <NavLink to='upload'>upload</NavLink>
        </nav>
      </aside>
      <div className='flex-1 h-full'>
        <Outlet />
      </div>
    </div>
  );
}
