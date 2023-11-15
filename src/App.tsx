import { useEffect, useRef, useState, createContext } from 'react';
import axios from 'axios';

import * as Slider from '@radix-ui/react-slider';
import * as Progress from '@radix-ui/react-progress';
import * as Dialog from '@radix-ui/react-dialog';

import { Lrc, useRecoverAutoScrollImmediately } from 'react-lrc';

import { AiFillCaretLeft, AiOutlineHeart } from 'react-icons/ai';
import {
  BsFillPlayFill,
  BsPauseFill,
  BsSkipEnd,
  BsSkipStart,
} from 'react-icons/bs';
import { BiCommentDetail } from 'react-icons/bi';
import { FiShare2 } from 'react-icons/fi';
import { PiCaretDownBold } from 'react-icons/pi';
import { MdPlaylistAdd } from 'react-icons/md';
import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb';

import { playlistType, songType } from './types';

import { millisToMinutesAndSeconds, useSongTimeType } from './hooks/Time';
import { useSongTime } from './hooks/Time';

import { Playlist, displayArtists } from './components/song';
import Button from './components/button';

import { cn } from './utils/cn';

import './lrc.css';

export const songContext = createContext<
  | {
      playlist?: playlistType;
      current?: songType;
      time: useSongTimeType;
      play: (props: { song: songType; playlist?: playlistType }) => void;
    }
  | undefined
>(undefined);

const testPlaylist: playlistType = {
  title: 'Birthday Playlist',
  cover: '/african-americans-in-america/cover.png',
  songs: [
    {
      id: 0,
      title: 'Ni**as In Paris',
      artists: ['Jay-Z', 'Kanye West'],
      features: [],
      coverUrl: '/african-americans-in-america/cover.png',
      songUrl: '/african-americans-in-america/song.mp3',
      lyricsUrl: '/african-americans-in-america/lyrics.lrc',
      duration: 232000,
    },
    {
      id: 1,
      title: 'Soul to Soul',
      artists: ['Kelvin Momo'],
      features: [],
      coverUrl: '/soul-to-soul.jpg',
      songUrl: '/soul-to-soul.mp3',
      duration: 481000,
    },
    {
      id: 2,
      title: 'Soul to Soul',
      artists: ['Kelvin Momo'],
      features: [],
      coverUrl: '/soul-to-soul.jpg',
      songUrl: '/soul-to-soul.mp3',
      duration: 481000,
    },
    {
      id: 3,
      title: 'Soul to Soul',
      artists: ['Kelvin Momo'],
      features: [],
      coverUrl: '/soul-to-soul.jpg',
      songUrl: '/soul-to-soul.mp3',
      duration: 481000,
    },
    {
      id: 4,
      title: 'Soul to Soul',
      artists: ['Kelvin Momo'],
      features: [],
      coverUrl: '/soul-to-soul.jpg',
      songUrl: '/soul-to-soul.mp3',
      duration: 481000,
    },
  ],
};

function App() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<
    playlistType | undefined
  >(undefined);
  const [currentSong, setCurrentSong] = useState<songType | undefined>(
    undefined
  );
  const [lyrics, setLyrics] = useState<string | undefined>(undefined);
  const songTime = useSongTime(currentSong);

  const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();

  useEffect(() => {
    if (currentSong) {
      // setting song
      songTime.setSong(currentSong);

      //fetching lyrics
      if (currentSong.lyricsUrl) {
        axios
          .get<string>(currentSong.lyricsUrl)
          .then((response) => setLyrics(response.data))
          .catch(() => setLyrics(undefined));
      } else {
        setLyrics(undefined);
      }
    }
  }, [currentSong]);

  useEffect(() => {
    console.log(signal);
  }, [signal]);

  const audioPlayer = useRef<HTMLAudioElement>(null);

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
    <songContext.Provider
      value={{
        playlist: currentPlaylist,
        current: currentSong,
        time: songTime,
        play({ song, playlist }) {
          setCurrentPlaylist(playlist);
          setCurrentSong(song);
        },
      }}
    >
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
        src={testPlaylist.cover}
        alt='perry'
      />

      <Playlist
        playlist={testPlaylist}
        className={cn({ 'pb-[74.8px]': currentSong })}
        searchbar
      />

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
                  <button className='flex flex-1 gap-2 justify-start'>
                    <img
                      src={currentSong.coverUrl}
                      width={56}
                      height={56}
                      className='rounded-lg border'
                      alt='song cover'
                    />

                    <div>
                      <span className='font-bold'>{currentSong.title}</span>
                      <br />
                      <span className='text-gray-600 text-sm'>
                        {displayArtists(currentSong.artists)}
                      </span>
                    </div>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Content className='w-screen h-screen fixed bg-white z-50 left-0 top-0 flex justify-center'>
                    {currentPlaylist && (
                      <div
                        id='current-playlist'
                        className='max-w-xs w-full pt-14 border-r pr-2'
                      >
                        <div className='mb-3 border-b gap-2 pb-2 flex'>
                          <img
                            src={currentPlaylist.cover}
                            width={56}
                            height={56}
                            className='rounded-lg border'
                            alt='song cover'
                          />
                          <div className='flex-1 items-center'>
                            <h2 className='text-xl font-semibold'>
                              {currentPlaylist.title}
                            </h2>
                            <p>
                              {millisToMinutesAndSeconds(
                                currentPlaylist?.songs
                                  .map(({ duration }) => duration)
                                  .reduce((partialSum, a) => partialSum + a, 0)
                              )}{' '}
                              minutes long
                            </p>
                          </div>

                          <Button
                            icon={<FiShare2 />}
                            variant='flat'
                            className='text-xl'
                          />
                        </div>

                        <Playlist playlist={currentPlaylist} searchbar />
                      </div>
                    )}

                    <div id='song-section' className='max-w-xl px-4'>
                      <Dialog.Close className='text-2xl ml-auto mb-4' asChild>
                        <Button icon={<PiCaretDownBold />} variant='flat' />
                      </Dialog.Close>

                      <img
                        src={currentSong.coverUrl}
                        className='rounded-3xl border mb-6'
                        alt='song cover'
                        width={420}
                      />

                      <div className='mb-4 text-center'>
                        <h1 className='text-2xl font-bold'>
                          {currentSong.title}
                        </h1>
                        <h2>{displayArtists(currentSong.artists)}</h2>
                      </div>

                      <div className='w-full flex mb-4 flex-wrap gap-2'>
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
                        />

                        <Button
                          icon={<TbRewindBackward10 />}
                          variant='flat'
                          className='text-[32px]'
                        />

                        <Button
                          icon={
                            audioPlaying ? <BsPauseFill /> : <BsFillPlayFill />
                          }
                          className='text-[32px] h-16 w-16 rounded-full'
                          onClick={handlePlayPause}
                        />

                        <Button
                          icon={<TbRewindForward10 />}
                          variant='flat'
                          className='text-[32px]'
                        />

                        <Button
                          icon={<BsSkipEnd />}
                          className='text-[32px]'
                          variant='flat'
                        />
                      </div>

                      <div className='w-full mb-3 flex gap-3 items-center text-sm'>
                        <span>{songTime.progress.get.string()}</span>
                        <Slider.Root
                          className='relative flex items-center select-none flex-1 touch-none w-[200px] h-5'
                          max={100}
                          value={[songTime.progress.get.percentage()]}
                          onValueChange={(newTimePercentnage) => {
                            if (audioPlayer.current) {
                              audioPlayer.current.currentTime =
                                ((newTimePercentnage[0] / 100) *
                                  currentSong.duration) /
                                1000;
                            }
                          }}
                        >
                          <Slider.Track className='bg-blue-200 relative grow rounded-full h-[3px]'>
                            <Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
                          </Slider.Track>
                          <Slider.Thumb className='block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-black rounded-[10px] hover:bg-blue-100 focus:outline-none focus:shadow-[0_0_0_5px] focus:border-blue-500' />
                        </Slider.Root>

                        <span>
                          {millisToMinutesAndSeconds(currentSong.duration)}
                        </span>
                      </div>
                    </div>

                    {lyrics && (
                      <div className='max-w-lg w-full pt-14'>
                        <Lrc
                          lrc={lyrics}
                          className='lrc'
                          style={{ height: '100%' }}
                          lineRenderer={({ active, line }) => (
                            <p
                              data-active={active}
                              className='text-gray-400 font-bold text-2xl cursor-pointer transition-all origin-left duration-300 data-[active=true]:text-black data-[active=false]:scale-75'
                              onClick={() => {
                                if (audioPlayer.current) {
                                  audioPlayer.current.currentTime =
                                    line.startMillisecond / 1000;
                                }
                              }}
                            >
                              {line.content}
                            </p>
                          )}
                          currentMillisecond={songTime.progress.get.milliseconds()}
                          recoverAutoScrollSingal={signal}
                          recoverAutoScrollInterval={3000}
                        />
                      </div>
                    )}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <Button
                icon={audioPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
                onClick={handlePlayPause}
                className='text-[48px] border-l border-gray-500'
                variant='flat'
              />
            </div>

            <audio
              src={currentSong.songUrl}
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
                // const songIsLast = currentSong.index === songs.length - 1;
                // const nextSongIndex = songIsLast ? 0 : currentSong.index++;
                // setCurrentSong({
                //   index: nextSongIndex,
                //   song: songs[nextSongIndex],
                // });
              }}
            ></audio>

            {/* <ReactAudioPlayer src={}  /> */}
          </div>
        </div>
      )}
    </songContext.Provider>
  );
}

export default App;
