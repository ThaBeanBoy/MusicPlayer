import { NavLink } from 'react-router-dom';
import playlists from '../assets/db/playlists';
import { Playlist } from '../components/song';

export default function NotFound() {
  return (
    <div className='min-h-screen w-full max-w-2xl mx-auto flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold mb-4'>404 Page does not exist</h1>
      <p className='mb-2'>
        Consider going back <NavLink to='/'>home</NavLink> or checkout some
        playlists.
      </p>
      <div className='flex flex-wrap gap-4 w-fit'>
        {playlists.slice(0, 3).map((playlist, key) => (
          <Playlist key={key} playlist={playlist} variant='box' />
        ))}
      </div>
    </div>
  );
}
