import { BsFillPlayFill, BsPauseFill, BsSearch } from 'react-icons/bs';
import { millisToMinutesAndSeconds } from '../hooks/Time';
import { artistType, playlistType, songType } from '../types';
import { useInput } from './input';
import { useContext } from 'react';
import { songContext } from '../App';
import { cn } from '../utils/cn';
import Button from './button';
import CurrentSongProgress from './songProgress';

export function Song({
  title,
  artists,
  coverUrl,
  duration,
  fromPlaylist,
  id,
  ...props
}: songType & { fromPlaylist?: playlistType }) {
  const currentSong = useContext(songContext);

  const isBeingPlayed = currentSong?.current?.id === id;

  const handleClick = async () => {
    if (!isBeingPlayed) {
      // loading the song
      try {
        await currentSong?.playSong({
          song: { title, artists, coverUrl, duration, id, ...props },
          playlist: fromPlaylist,
        });

        return;
      } catch (error) {
        console.error(error);
      }
    }

    // opening expansion
    if (currentSong && !currentSong.controls.expanded) {
      currentSong.controls.expand();
    }
  };

  return (
    <div>
      <div className='flex items-center'>
        <button
          onClick={handleClick}
          className='flex gap-2 w-full py-2 items-center'
          disabled={isBeingPlayed && currentSong.controls.expanded}
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
            <span className='text-gray-600 text-sm'>
              <Artists artists={artists} />
            </span>
          </div>

          {!isBeingPlayed && <span>{millisToMinutesAndSeconds(duration)}</span>}
        </button>

        {isBeingPlayed && (
          <Button
            icon={
              currentSong.controls.isPlaying ? (
                <BsPauseFill />
              ) : (
                <BsFillPlayFill />
              )
            }
            onClick={currentSong.controls.playPause}
            variant='flat'
            className='text-3xl'
          />
        )}
      </div>

      {isBeingPlayed && <CurrentSongProgress />}
    </div>
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
              artist.name
                .toLowerCase()
                .replace(/\s/g, '')
                .includes(searchInput.value.replace(/\s/g, ''))
            );
          })
          .map(({ ...props }, key) => (
            <li key={key} className='border-b'>
              <Song {...props} fromPlaylist={playlist} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export function Artist({
  name,
  link,
  provideLink = false,
}: artistType & { provideLink?: boolean }) {
  return link && provideLink ? (
    <a href={link} className='text-blue-500'>
      {name}
    </a>
  ) : (
    name
  );
}

export function Artists({
  artists,
  className,
  provideArtistLink = false,
}: {
  artists: artistType[];
  className?: string;
  provideArtistLink?: boolean;
}) {
  return (
    <ul className={cn('', className)}>
      {artists.length > 1 ? (
        // Multiple artist
        artists.map(({ name, link }, key) => {
          const justBeforeLastArtsist = key === artists.length - 2;
          const lastArtist = key === artists.length - 1;

          return (
            <li className='inline' key={key}>
              <Artist name={name} link={link} provideLink={provideArtistLink} />
              {!lastArtist && (justBeforeLastArtsist ? ' & ' : ', ')}
            </li>
          );
        })
      ) : (
        // Only 1 artist
        <li className='inline'>
          <Artist
            name={artists[0].name}
            link={artists[0].link}
            provideLink={provideArtistLink}
          />
        </li>
      )}
    </ul>
  );
}
