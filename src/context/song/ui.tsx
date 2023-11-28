import { forwardRef, useContext, HtmlHTMLAttributes } from 'react';

import { Lrc, useRecoverAutoScrollImmediately } from 'react-lrc';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import * as Slider from '@radix-ui/react-slider';

import songContext from './context';

import { millisToMinutesAndSeconds } from '../../hooks/Time';

import Button from '../../components/button';
import { Artists, Playlist } from '../../components/song';

import { FiShare2 } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { MdPlaylistAdd } from 'react-icons/md';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsSkipEnd,
  BsSkipStart,
} from 'react-icons/bs';
import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb';

import { cn } from '../../utils/cn';

import './lrc.css';

export const Lyrics = forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const currentSong = useContext(songContext);
  const { signal } = useRecoverAutoScrollImmediately();

  return (
    currentSong &&
    currentSong.lyrics && (
      <div {...props} ref={ref}>
        <Lrc
          lrc={currentSong.lyrics}
          className='lrc'
          style={{ height: '100%' }}
          lineRenderer={({ active, line }) => (
            <p
              data-active={active}
              className='text-gray-400 font-bold text-2xl cursor-pointer transition-all origin-left duration-300 data-[active=true]:text-black data-[active=false]:scale-75'
              onClick={() =>
                currentSong.controls.jumpTo.millisecond(line.startMillisecond)
              }
            >
              {line.content}
            </p>
          )}
          currentMillisecond={currentSong.time.progress.get.milliseconds()}
          recoverAutoScrollSingal={signal}
          recoverAutoScrollInterval={3000}
        />
      </div>
    )
  );
});

export const CurrentPlaylist = forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const currentSong = useContext(songContext);

  return (
    currentSong?.playlist && (
      <div {...props} ref={ref}>
        <div className='mb-3 border-b gap-2 pb-2 flex'>
          <div className='rounded-lg border w-14 h-14 overflow-hidden'>
            <AspectRatio.Root ratio={1}>
              <img
                src={currentSong.playlist.cover}
                className='h-full w-full object-cover'
                alt='song cover'
              />
            </AspectRatio.Root>
          </div>
          <div className='flex-1 items-center'>
            <h2 className='text-xl font-semibold'>
              {currentSong.playlist.title}
            </h2>
            <p>
              {millisToMinutesAndSeconds(
                currentSong.playlist?.songs
                  .map(({ duration }) => duration)
                  .reduce((partialSum, a) => partialSum + a, 0)
              )}{' '}
              minutes long
            </p>
          </div>

          <Button icon={<FiShare2 />} variant='flat' className='text-xl' />
        </div>

        <Playlist playlist={currentSong.playlist} searchbar />
      </div>
    )
  );
});

export const Controls = forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const currentSong = useContext(songContext);

  if (currentSong === undefined) return <></>;

  const { controls, time: songTime } = currentSong;

  return (
    currentSong.current && (
      <div
        className={cn('flex max-w-md flex-col items-center', className)}
        {...props}
        ref={ref}
      >
        <div className='rounded-3xl w-full border mb-6 overflow-hidden'>
          <AspectRatio.Root ratio={1}>
            <img
              src={currentSong.current.coverUrl}
              className='h-full w-full object-cover'
              alt='song cover'
            />
          </AspectRatio.Root>
        </div>

        <div className='mb-4 text-center'>
          <h1 className='text-2xl font-bold'>{currentSong.current.title}</h1>
          <Artists artists={currentSong.current.artists} provideArtistLink />
          {currentSong.current.features.length > 1 && (
            <>
              features:{' '}
              <Artists
                artists={currentSong.current.features}
                provideArtistLink
              />
            </>
          )}
        </div>

        <div className='flex mb-4 mx-auto flex-wrap gap-2'>
          <Button
            icon={<AiOutlineHeart />}
            label='8.2k'
            variant='hollow'
            className='flex-row-reverse shadow-none px-2 py-1 border-blue-300'
          />

          <Button
            icon={<BiCommentDetail />}
            label='720'
            variant='hollow'
            className='flex-row-reverse px-2 py-1 shadow-none border-blue-300'
          />

          <Button
            icon={<MdPlaylistAdd />}
            label='Add to playlist'
            variant='hollow'
            className='flex-row-reverse px-2 py-1 shadow-none border-blue-300'
          />

          <Button
            icon={<FiShare2 />}
            onClick={async () => {
              try {
                await navigator.share({
                  url: '',
                  title: 'songs',
                });
              } catch (error) {
                alert('something went wrong');
                console.error(error);
              }
            }}
            label='Share'
            variant='hollow'
            className='flex-row-reverse px-2 py-1 shadow-none border-blue-300'
          />
        </div>

        <div className='flex items-center mb-4 gap-8 justify-center'>
          <Button
            icon={<BsSkipStart />}
            className='text-[32px]'
            variant='flat'
            onClick={() => controls.loadPreviousSong()}
          />

          <Button
            icon={<TbRewindBackward10 />}
            variant='flat'
            className='text-[32px]'
            onClick={() => {
              try {
                controls.jumpTo.second(songTime.progress.get.seconds() - 10);
              } catch {
                controls.jumpTo.second(0);
              }
            }}
          />

          <Button
            icon={controls.isPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
            className='text-[32px] h-16 w-16 rounded-full'
            onClick={() => controls.playPause()}
          />

          <Button
            icon={<TbRewindForward10 />}
            variant='flat'
            className='text-[32px]'
            onClick={() => {
              try {
                controls.jumpTo.second(songTime.progress.get.seconds() + 10);
              } catch {
                controls.jumpTo.second(songTime.duration.get.seconds());
              }
            }}
          />

          <Button
            icon={<BsSkipEnd />}
            className='text-[32px]'
            variant='flat'
            onClick={() => {
              controls.loadNextSong();
            }}
          />
        </div>

        <div className='w-full mb-3 flex gap-3 items-center text-sm'>
          <span>{songTime.progress.get.string()}</span>
          <Slider.Root
            className='relative flex items-center select-none flex-1 touch-none w-[200px] h-5'
            max={100}
            value={[songTime.progress.get.percentage()]}
            onValueChange={(newTimePercentnage) => {
              controls.jumpTo.millisecond(
                (newTimePercentnage[0] / 100) *
                  songTime.duration.get.milliseconds()
              );
            }}
          >
            <Slider.Track className='bg-blue-200 relative grow rounded-full h-[3px]'>
              <Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
            </Slider.Track>
            <Slider.Thumb className='block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-black rounded-[10px] hover:bg-blue-100 focus:outline-none focus:shadow-[0_0_0_5px] focus:border-blue-500' />
          </Slider.Root>

          <span>{songTime.duration.get.string()}</span>
        </div>
      </div>
    )
  );
});
