import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { millisToMinutesAndSeconds } from '../hooks/Time';
import { playlistType, songType } from '../types';
import { MouseEventHandler, useContext } from 'react';
import songContext from '../context/song/context';
import Button from './button';
import CurrentSongProgress from './songProgress';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Artists } from './artist';
import { cn } from '../utils/cn';

export function Song({
  title,
  artists,
  coverUrl,
  duration,
  fromPlaylist,
  id,
  onClick,
  className,
  hideProgress = false,
  ...props
}: songType & {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  hideProgress?: boolean;
  fromPlaylist?: playlistType;
}) {
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
    <div className={cn('max-w-lg py-2', className)}>
      <div className='flex items-center'>
        <button
          onClick={onClick || handleClick}
          className={cn('flex gap-2 w-full items-center', {
            'pb-2': isBeingPlayed,
          })}
          // disabled={isBeingPlayed && currentSong.dialog?.isOpen}
        >
          <div className='rounded-lg border w-14 h-14 overflow-hidden'>
            <AspectRatio.Root ratio={1}>
              <img
                src={coverUrl}
                width={56}
                height={56}
                className='h-full w-full object-cover'
                alt='song cover'
              />
            </AspectRatio.Root>
          </div>

          <div className='flex-1 flex flex-col items-start w-full text-ellipsis truncate'>
            <span className='font-bold truncate w-full text-left'>{title}</span>{' '}
            <br />
            <Artists
              artists={artists}
              className='text-gray-600 text-sm truncate w-full text-left'
            />
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

      {!hideProgress && (
        <CurrentSongProgress
          className={cn('invisible', { visible: isBeingPlayed })}
        />
      )}
    </div>
  );
}
