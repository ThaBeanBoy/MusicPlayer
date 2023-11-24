import { NavLink, useParams } from 'react-router-dom';
import playlists from '../../assets/db/playlists';
import { Artists, Playlist } from '../../components/song';
import { millisToMinutesAndSeconds } from '../../hooks/Time';
import { useContext } from 'react';
import songContext from '../../context/song/context';
import { cn } from '../../utils/cn';

export default function List() {
  const currentSong = useContext(songContext);
  const { id } = useParams();

  if (id === undefined) throw new Error();

  // check valid id

  // check if the list is valid

  const playlist = playlists[parseInt(id)];
  const { songs, description, cover, title } = playlist;

  const artists = playlist.songs
    .map((song) => song.artists)
    .reduce((prev, next) => prev.concat(next));

  return (
    <div className='max-w-6xl w-fit mx-auto items-start flex flex-col md:flex-row gap-4'>
      <NavLink to='/'>back</NavLink>

      <div className='w-full max-w-md'>
        <img
          src={cover}
          alt={`${title} cover`}
          className='rounded-3xl w-full'
        />
        <h2 className='font-bold text-2xl'>{title}</h2>
        <Artists artists={artists} provideArtistLink />
        <p>
          {songs.length} songs -{' '}
          {millisToMinutesAndSeconds(
            playlist.songs
              .map(({ duration }) => duration)
              .reduce((partialSum, a) => partialSum + a, 0)
          )}{' '}
          minutes
        </p>
        {description && (
          <>
            <hr className='my-4 hidden md:block' />{' '}
            <p className='text-sm hidden md:block'>{description}</p>
          </>
        )}
      </div>

      <div
        className={cn('w-full', {
          'pb-[75px]': currentSong?.current !== undefined,
        })}
      >
        <Playlist playlist={playlist} searchbar className='w-full max-w-lg' />
        {description && (
          <>
            <hr className='my-4 md:hidden' />{' '}
            <p className='text-sm md:hidden pb-4'>{description}</p>
          </>
        )}
      </div>
    </div>
  );
}
