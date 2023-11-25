import { BsFillPlayFill, BsPauseFill, BsSearch } from 'react-icons/bs';
import { millisToMinutesAndSeconds } from '../hooks/Time';
import { artistType, playlistType, songType } from '../types';
import Input, { useInput } from './input';
import { useContext } from 'react';
import songContext from '../context/song/context';
import { cn } from '../utils/cn';
import Button from './button';
import CurrentSongProgress from './songProgress';
import { NavLink } from 'react-router-dom';

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
        currentSong?.loadSong({
          song: { title, artists, coverUrl, duration, id, ...props },
          playlist: fromPlaylist,
        });

        console.log(`button event : ${currentSong?.current?.title}`);

        return;
      } catch (error) {
        console.error(error);
      }
    }

    // opening expansion
    if (currentSong && !currentSong.dialog?.isOpen) {
      currentSong.dialog?.open();
    }
  };

  return (
    <div>
      <div className='flex items-center'>
        <button
          onClick={handleClick}
          className='flex gap-2 w-full py-2 items-center'
          // disabled={isBeingPlayed && currentSong.dialog?.isOpen}
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
  variant = 'list',
}: {
  playlist: playlistType;
  searchbar?: boolean;
  className?: string;
  ulClassName?: string;
  variant?: 'box' | 'list';
}) {
  const currentSong = useContext(songContext);
  const isBeingPlayed = currentSong?.playlist?.id === playlist.id;
  const searchInput = useInput();

  if (variant === 'list')
    return (
      <div className={className}>
        {searchbar && (
          <>
            {/* <div className='relative w-full'>
              <input
                placeholder='search'
                className='px-2 py-3 border-b-2 w-full border-gray-300 outline-none focus:border-blue-500'
                
              />
              <BsSearch className='absolute right-2 bottom-3 translate-y-[-2px]' />
            </div> */}
            <Input
              icon={<BsSearch />}
              wrapperClassname='max-w-none w-full'
              placeholder={`Search in '${playlist.title}'`}
              {...searchInput.inputProps}
            />
          </>
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

  const artists = playlist.songs
    .map((song) => song.artists)
    .reduce((prev, next) => prev.concat(next));

  return (
    <NavLink
      to={`list/${playlist.id}`}
      className={cn(
        'text-black hover:text-black group flex flex-col items-start w-52',
        className
      )}
    >
      <div className='relative w-full'>
        <img
          src={playlist.cover}
          alt={`${playlist.title} cover`}
          className={cn(
            'rounded-2xl border w-full group-hover:brightness-75 transition',
            { 'brightness-75': isBeingPlayed }
          )}
        />
        <span
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold opacity-0',
            { 'opacity-100': isBeingPlayed }
          )}
        >
          Is Playing
        </span>
      </div>
      <div className='px-2 text-left w-full text-ellipsis truncate'>
        <p className='font-semibold w-full truncate'>{playlist.title}</p>
        <Artists artists={artists} className='text-sm w-full truncate' />
      </div>
    </NavLink>
  );
}

export function Artist({
  name,
  link,
  provideLink = false,
}: artistType & { provideLink?: boolean }) {
  return link && provideLink ? (
    <a href={link} target='_blank' className='text-blue-500'>
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
