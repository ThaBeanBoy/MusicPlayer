import { NavLink } from 'react-router-dom';
import artistTable from '../assets/db/artists';
import { artistType } from '../types';
import { cn } from '../utils/cn';
import { useContext } from 'react';
import songContext from '../context/song/context';

export function Artist({
  artist,
  provideLink = false,
}: {
  artist: artistType;
  provideLink?: boolean;
}) {
  const Song = useContext(songContext);
  const { name, id } = artist;

  return provideLink ? (
    <NavLink
      to={`/artist/${id}`}
      onClick={Song?.dialog.close}
      className='text-blue-500'
    >
      {name}
    </NavLink>
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
  const artistSet = [...new Set(artists.map(({ id }) => id))].map(
    (id) => artistTable[id]
  );

  return (
    <ul className={cn('', className)}>
      {artists.length > 1 ? (
        // Multiple artist
        artistSet.map((artist, key) => {
          const justBeforeLastArtsist = key === artistSet.length - 2;
          const lastArtist = key === artistSet.length - 1;

          return (
            <li className='inline' key={key}>
              <Artist artist={artist} provideLink={provideArtistLink} />
              {!lastArtist && (justBeforeLastArtsist ? ' & ' : ', ')}
            </li>
          );
        })
      ) : (
        // Only 1 artist
        <li className='inline'>
          <Artist artist={artists[0]} provideLink={provideArtistLink} />
        </li>
      )}
    </ul>
  );
}
