import { useNavigate, useParams } from 'react-router-dom';
import playlists from '../../assets/db/playlists';
import Playlist from '../../components/playlist';
import { Artists } from '../../components/artist';
import { milliTime } from '../../hooks/Time';
import Button from '../../components/button';
import { IoChevronBack } from 'react-icons/io5';

export default function List() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) throw new Error();

  const playlist = playlists[parseInt(id)];
  const { songs, description, cover, title } = playlist;
  const goBack = () => {
    navigate(-1);
  };

  const artists = playlist.songs
    .map((song) => song.artists)
    .reduce((prev, next) => prev.concat(next));

  const duration = milliTime({
    millis: songs
      .map(({ duration }) => duration)
      .reduce((partialSum, a) => partialSum + a, 0),
    format: 'hms',
  });

  return (
    <div className='max-w-6xl w-fit mx-auto items-start flex flex-col md:flex-row gap-4'>
      <Button
        icon={<IoChevronBack />}
        onClick={goBack}
        className='text-xl md:sticky md:top-4'
        variant='flat'
      />

      <div className='w-full max-w-md md:sticky md:top-4'>
        <img
          src={cover}
          alt={`${title} cover`}
          className='rounded-3xl w-full'
        />
        <h2 className='font-bold text-2xl'>{title}</h2>
        <Artists artists={artists} provideArtistLink />
        <p>
          {songs.length} song{songs.length > 1 && 's'} -
          {duration.string({ displaySeconds: false })}
        </p>
        {description && (
          <>
            <hr className='my-4 hidden md:block' />{' '}
            <p className='text-sm hidden md:block'>{description}</p>
          </>
        )}
      </div>

      <div className={'w-full'}>
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
