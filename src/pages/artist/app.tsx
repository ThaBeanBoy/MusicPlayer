import { useNavigate, useParams } from 'react-router-dom';
import artists from '../../assets/db/artists';
import songsDB from '../../assets/db/songs';
import playlistsDB from '../../assets/db/playlists';
import { Song } from '../../components/song';
import Button from '../../components/button';
import { IoChevronBack } from 'react-icons/io5';
import Playlist, { getPlaylistArtists } from '../../components/playlist';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { FiShare2 } from 'react-icons/fi';
export default function Artist() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) throw new Error();

  const { name, description, link, coverUrl } = artists[parseInt(id)];

  const songs = songsDB.filter(({ artists }) =>
    artists.some((artist) => artist.id === parseInt(id))
  );

  const playlists = playlistsDB.filter((playlist) =>
    getPlaylistArtists(playlist).some((artist) => artist.id === parseInt(id))
  );

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {coverUrl && (
        <div className='relative'>
          <div className='w-full brightness-50 rounded-3xl overflow-hidden'>
            <AspectRatio.Root ratio={4 / 1}>
              <img
                src={coverUrl}
                className='h-full w-full object-cover'
                alt={`${name} cover`}
              />
            </AspectRatio.Root>
          </div>
          <div className='absolute left-1/2 -translate-x-1/2 bottom-4 max-w-2xl mx-auto w-full text-white'>
            <h2 className='text-3xl font-bold mb-4'>{name}</h2>
            <div className='prose text-white text-sm tracking-wide mb-4'>
              {description}{' '}
              {link && (
                <a href={link} target='_blank'>
                  wiki
                </a>
              )}
            </div>
            <div className='flex gap-2'>
              <Button
                label='Back'
                icon={<IoChevronBack />}
                className='flex-row-reverse'
                onClick={goBack}
              />
              <Button label='share' icon={<FiShare2 />} />
            </div>
          </div>
        </div>
      )}

      <div className='mx-auto max-w-2xl'>
        {link && (
          <a href={link} target='_blank'>
            wiki
          </a>
        )}

        <h3 className='text-2xl font-bold'>Song{songs.length > 1 && 's'}</h3>
        <div>
          {songs.map((song, key) => (
            <Song {...song} key={`song-${key}`} className='max-w-none' />
          ))}
        </div>
        <h3 className='text-2xl font-bold'>
          In Playlist{playlists.length > 1 && 's'}
        </h3>
        <div>
          {playlists.map((playlist, key) => (
            <Playlist
              key={`playlist-${key}`}
              playlist={playlist}
              variant='box'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
