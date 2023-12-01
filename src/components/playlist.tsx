import { useContext } from 'react';
import songContext from '../context/song/context';
import Input, { useInput } from './input';
import { playlistType } from '../types';
import { cn } from '../utils/cn';
import { BsSearch } from 'react-icons/bs';
import { Song } from './song';
import { NavLink } from 'react-router-dom';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { milliTime } from '../hooks/Time';
import { Artists } from './artist';
import artistsDB from '../assets/db/artists';

export default function Playlist({
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

  const { songs } = playlist;

  if (variant === 'list')
    return (
      <div className={cn('relative', className)}>
        {searchbar && (
          <>
            <Input
              icon={<BsSearch />}
              wrapperClassname='max-w-none sticky top-0 w-full z-40'
              placeholder={`Search song name or artist in '${playlist.title}'`}
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
                  .includes(searchInput.value.toLowerCase().replace(/\s/g, ''))
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

  const duration = milliTime({
    millis: songs
      .map(({ duration }) => duration)
      .reduce((partialSum, a) => partialSum + a, 0),
    format: 'hms',
  });

  return (
    <NavLink
      to={`/list/${playlist.id}`}
      className={cn(
        'text-black hover:text-black group flex flex-col items-start w-52',
        className
      )}
    >
      <div className='relative w-full'>
        <div
          className={cn(
            'rounded-2xl border overflow-hidden w-full group-hover:brightness-75 transition',
            { 'brightness-75': isBeingPlayed }
          )}
        >
          <AspectRatio.Root ratio={1}>
            <img
              className='h-full w-full object-cover'
              src={playlist.cover}
              alt={`${playlist.title} cover`}
            />
          </AspectRatio.Root>
        </div>
        <span
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold opacity-0',
            { 'opacity-100': isBeingPlayed }
          )}
        >
          Is Playing
        </span>

        <span className='bg-white text-xs px-2 py-1 absolute top-2 right-2 rounded-md opacity-0 group-hover:opacity-100 transition'>
          {duration.string({ displaySeconds: false })}
        </span>
      </div>
      <div className='px-2 text-left w-full text-ellipsis truncate'>
        <p className='font-semibold w-full truncate'>{playlist.title}</p>
        <Artists
          artists={getPlaylistArtists(playlist)}
          className='text-sm w-full truncate'
        />
      </div>
    </NavLink>
  );
}

export function getPlaylistArtists({ songs }: playlistType) {
  const artists = songs
    .map(({ artists, features }) => [...artists, ...features])
    .reduce((prev, next) => prev.concat(next));

  return [...new Set(artists.map(({ id }) => id))].map((id) => artistsDB[id]);
}
