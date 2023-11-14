import { BsSearch } from 'react-icons/bs';
import { millisToMinutesAndSeconds } from '../hooks/Time';
import { playlistType, songType } from '../types';
import { useInput } from './input';
import { useContext } from 'react';
import { songContext } from '../App';

export function Song({
  title,
  artists,
  coverUrl,
  duration,
  fromPlaylist,
  ...props
}: songType & { fromPlaylist?: playlistType }) {
  const currentSong = useContext(songContext);

  const defaultClickAction = () => {
    currentSong?.play({
      song: { title, artists, coverUrl, duration, ...props },
      playlist: fromPlaylist,
    });
  };

  return (
    <button
      onClick={defaultClickAction}
      className='flex gap-2 w-full items-center'
    >
      <img
        src={coverUrl}
        width={56}
        height={56}
        className='rounded-lg border'
        alt='song cover'
      />

      <div className='flex-1 flex flex-col items-start'>
        <span className='font-bold'>{title}</span> <br />
        <span className='text-gray-600 text-sm'>{displayArtists(artists)}</span>
      </div>

      <span>{millisToMinutesAndSeconds(duration)}</span>
    </button>
  );
}

export function Playlist({
  playlist,
  searchbar,
  className,
  ulClassName,
}: {
  playlist: playlistType;
  searchbar?: boolean;
  className?: string;
  ulClassName?: string;
}) {
  const searchInput = useInput();

  return (
    <div className={className}>
      {searchbar && (
        <div className='relative w-full'>
          <input
            placeholder='search'
            className='px-2 py-3 border-b-2 w-full border-gray-300 outline-none focus:border-blue-500'
            {...searchInput.inputProps}
          />
          <BsSearch className='absolute right-2 bottom-3 translate-y-[-2px]' />
        </div>
      )}

      <ul className={ulClassName}>
        {playlist.songs
          .filter(({ title, artists, features }) => {
            if (searchInput.valueIsEmpty) return true;

            // searching by name
            if (
              title
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(searchInput.value.toLowerCase().replace(/\s/g, ''))
            )
              return true;

            // searching by artist & feature names
            return [...artists, ...features].some((artist) =>
              artist
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(searchInput.value.replace(/\s/g, ''))
            );
          })
          .map(({ ...props }, key) => (
            <li key={key} className='border-b py-2'>
              <Song {...props} fromPlaylist={playlist} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export function displayArtists(artists: string[]) {
  return artists.length > 1
    ? `${artists.slice(0, -1).join(', ')} & ${artists[artists.length - 1]}`
    : artists;
}
