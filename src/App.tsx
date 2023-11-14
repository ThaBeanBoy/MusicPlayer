import React, { useEffect, useRef, useState } from 'react';
import perry from './assets/perry.jpg';
import { songType } from './types';

import * as Slider from '@radix-ui/react-slider';
import * as Progress from '@radix-ui/react-progress';
import * as Dialog from '@radix-ui/react-dialog';

import { AiFillCaretLeft, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsSearch,
  BsSkipEnd,
  BsSkipStart,
} from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import { FiShare2 } from 'react-icons/fi';
import { PiCaretDownBold } from 'react-icons/pi';
import { MdPlaylistAdd } from 'react-icons/md';

import { millisToMinutesAndSeconds } from './hooks/Time';
import { useSongTime } from './hooks/Time';

import { useInput } from './components/input';
import Button from './components/button';

import './audioControls.css';
import { cn } from './utils/cn';

const songs: songType[] = [
  {
    title: 'Homies in Paris',
    artists: ['Jay-Z', 'Kanye West'],
    features: [],
    coverUrl: '/african-americans-in-america/cover.png',
    songUrl: '/african-americans-in-america/song.mp3',
    duration: 251000,
  },
  {
    title: 'Soul to Soul',
    artists: ['Kelvin Momo'],
    features: [],
    coverUrl: '/soul-to-soul.jpg',
    songUrl: '/soul-to-soul.mp3',
    duration: 481000,
  },
  {
    title: 'Soul to Soul',
    artists: ['Kelvin Momo'],
    features: [],
    coverUrl: '/soul-to-soul.jpg',
    songUrl: '/soul-to-soul.mp3',
    duration: 481000,
  },
  {
    title: 'Soul to Soul',
    artists: ['Kelvin Momo'],
    features: [],
    coverUrl: '/soul-to-soul.jpg',
    songUrl: '/soul-to-soul.mp3',
    duration: 481000,
  },
  {
    title: 'Soul to Soul',
    artists: ['Kelvin Momo'],
    features: [],
    coverUrl: '/soul-to-soul.jpg',
    songUrl: '/soul-to-soul.mp3',
    duration: 481000,
  },
];

function displayArtists(artists: string[]) {
  return artists.length > 1
    ? `${artists.slice(0, -1).join(', ')} & ${artists[artists.length - 1]}`
    : artists;
}

function Song({
  title,
  artists,
  coverUrl,
  duration,
  onClick,
}: { onClick?: React.MouseEventHandler<HTMLButtonElement> } & songType) {
  return (
    <button onClick={onClick} className='flex gap-2 w-full items-center'>
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

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audioPlayerExpanded, setaudioPlayerExpanded] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<
    { index: number; song: songType } | undefined
  >(undefined);
  const songTime = useSongTime(currentSong?.song);

  useEffect(() => {
    if (currentSong) {
      songTime.setSong(currentSong.song);
    }
  }, [currentSong]);

  const audioPlayer = useRef<HTMLAudioElement>(null);

  const searchInput = useInput();

  const handlePlayPause = async () => {
    if (audioPlaying) {
      audioPlayer.current?.pause();
      return;
    }

    try {
      await audioPlayer.current?.play();
    } catch (error) {
      console.log(error);
      alert('something went wrong with playing the audio');
    }
  };

  return (
    <>
      <div className='flex gap-3 items-center pt-3'>
        <button>
          <AiFillCaretLeft />
        </button>
        <p className='font-bold'>Birthday Playlist</p>{' '}
        <button className='ml-auto'>
          <FiShare2 />
        </button>
      </div>
      <img
        className='w-full rounded-3xl mt-4'
        src={/* currentSong ? currentSong.song.coverUrl : */ perry}
        alt='perry'
      />

      <div className='relative w-full'>
        <input
          placeholder='search'
          className='px-2 py-3 border-b-2 w-full border-gray-300 outline-none focus:border-blue-500'
          {...searchInput.inputProps}
        />
        <BsSearch className='absolute right-2 bottom-3 translate-y-[-2px]' />
      </div>

      <ul className={cn({ 'pb-[74.8px]': currentSong })}>
        {songs
          .filter(({ title, artists, features }) => {
            if (searchInput.valueIsEmpty) return true;

            // searching by name
            if (title.toLowerCase().includes(searchInput.value.toLowerCase()))
              return true;

            // searching by artist & feature names
            return [...artists, ...features].some((artist) =>
              artist.toLowerCase().includes(searchInput.value)
            );
          })
          .map(({ ...props }, key) => (
            <li key={key} className='border-b py-2'>
              <Song
                {...props}
                onClick={() => {
                  setCurrentSong({ index: key, song: { ...props } });
                  audioPlayer.current?.load();
                }}
              />
            </li>
          ))}
      </ul>

      {currentSong && (
        <div
          id='audio-controls-container'
          className='group fixed bottom-0 w-full bg-white z-40 left-1/2 translate-x-[-50%] border-t text-lg px-2 pb-2'
        >
          <Progress.Root className='relative overflow-hidden bg-blue-200 rounded-full w-full h-[2px] mb-2'>
            <Progress.Indicator
              className='bg-blue-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
              style={{
                transform: `translateX(-${
                  100 - songTime.progress.get.percentage()
                }%)`,
              }}
            />
          </Progress.Root>

          <div id='audio-controls' className='mx-auto max-w-2xl'>
            {/* song info */}
            <div className='flex gap-2 w-full items-center'>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    className='flex flex-1 gap-2 justify-start'
                    onClick={() => setaudioPlayerExpanded(true)}
                  >
                    <img
                      src={currentSong.song.coverUrl}
                      width={56}
                      height={56}
                      className='rounded-lg border'
                      alt='song cover'
                    />

                    <div>
                      <span className='font-bold'>
                        {currentSong.song.title}
                      </span>
                      <br />
                      <span className='text-gray-600 text-sm'>
                        {displayArtists(currentSong.song.artists)}
                      </span>
                    </div>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Content className='w-screen h-screen fixed bg-white z-50 left-0 top-0 flex justify-center'>
                    <div id='song-section' className='max-w-xl px-4'>
                      <Dialog.Close className='text-2xl ml-auto mb-4' asChild>
                        <Button icon={<PiCaretDownBold />} variant='flat' />
                      </Dialog.Close>
                      <img
                        src={currentSong.song.coverUrl}
                        className='rounded-3xl border mx-auto'
                        alt='song cover'
                        width={420}
                      />

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
                        label='Share'
                        variant='hollow'
                        className='flex-row-reverse px-2 py-1 shadow-none border-blue-300'
                      />

                      <div className='flex items-center gap-8 mx-auto'>
                        <Button
                          icon={<BsSkipStart />}
                          className='text-[32px]'
                          variant='flat'
                        />
                        <button
                          onClick={handlePlayPause}
                          className='text-[64px]'
                        >
                          {audioPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
                        </button>
                        <button className='text-[32px]'>
                          <BsSkipEnd />
                        </button>
                      </div>

                      <div className='w-full mb-3 flex gap-3 items-center text-sm'>
                        <span>{songTime.progress.get.string()}</span>
                        <Slider.Root
                          className='relative flex items-center select-none flex-1 touch-none w-[200px] h-5'
                          max={100}
                          value={[songTime.progress.get.percentage()]}
                          onValueChange={(newTimePercentnage) => {
                            if (audioPlayer.current) {
                              songTime.progress.set.percentage(
                                newTimePercentnage[0]
                              );
                              audioPlayer.current.currentTime =
                                songTime.progress.get.seconds();
                            }
                          }}
                        >
                          <Slider.Track className='bg-blue-200 relative grow rounded-full h-[3px]'>
                            <Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
                          </Slider.Track>
                          <Slider.Thumb className='block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-black rounded-[10px] hover:bg-blue-100 focus:outline-none focus:shadow-[0_0_0_5px] focus:border-blue-500' />
                        </Slider.Root>

                        <span>
                          {millisToMinutesAndSeconds(currentSong.song.duration)}
                        </span>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <button
                onClick={handlePlayPause}
                className='text-[48px] border-l'
              >
                {audioPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
              </button>
            </div>

            <audio
              src={currentSong.song.songUrl}
              preload='metadata'
              ref={audioPlayer}
              onPlay={() => setAudioPlaying(true)}
              onPause={() => setAudioPlaying(false)}
              onTimeUpdate={() => {
                songTime.progress.set.seconds(
                  audioPlayer.current?.currentTime ?? 0
                );
              }}
              onEnded={() => {
                const songIsLast = currentSong.index === songs.length - 1;
                const nextSongIndex = songIsLast ? 0 : currentSong.index++;
                setCurrentSong({
                  index: nextSongIndex,
                  song: songs[nextSongIndex],
                });
              }}
            ></audio>

            {/* <ReactAudioPlayer src={}  /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
