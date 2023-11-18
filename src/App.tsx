import { useEffect, useRef, useState, createContext } from 'react';
import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';

import { AiFillCaretLeft } from 'react-icons/ai';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { FiShare2, FiMinimize2, FiX } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { playlistType, songType } from './types';

import { useSongTimeType } from './hooks/Time';
import { useSongTime } from './hooks/Time';

import { Playlist, Artists } from './components/song';
import Button from './components/button';
import { Lyrics, CurrentPlaylist, Controls } from './context/song';

import { cn } from './utils/cn';

import CurrentSongProgress from './components/songProgress';

import { testPlaylist } from './assets/fakeDb';
import useWindowDimensions, { useScreen } from './hooks/windowDimensions';

export const songContext = createContext<
  | {
      playlist?: playlistType;
      current?: songType;
      time: useSongTimeType;
      lyrics: string | undefined;
      controls: {
        expand: () => void;
        collapse: () => void;
        expanded: boolean;
        songTime: useSongTimeType;
        isPlaying: boolean;
        play: () => Promise<void> | undefined;
        pause: () => void;
        playPause: () => Promise<void>;
        jumpTo: {
          millisecond: (millisecond: number) => void;
          second: (second: number) => void;
        };
      };
      playSong: (args: {
        song: songType;
        playlist?: playlistType;
      }) => Promise<void> | undefined;
    }
  | undefined
>(undefined);

/*
  Make playlists for:

  ! Add artist links
  
  - Judge me, I don't care (Tineyi & ${original artist's name})
  - Gamers GG (Gta Themes, Nintendo Wii)
  - Hip Hop (M.A.A.D, Cole's library, FPS, Wow freestyle 6 God, It aint hard to tell)
  - Save the semester mode
  - Sandile Strict Session vol 4
  - Tanatswa (Ganster Nkazana - Musikana Wemacider)
  - Tanaka & Aneen (Vasikana va mwari)
  - Kudzi (Amai Papa Bear)
  - Rivo (Munghana Rulani & Prince Rhangani)
  - Sesi (Khosikadzi va mavenda)
  - Mpumi, Nkosana & Andrew (name: Past Paper Chowers United, playlist: E Les Foyer Cremming) | Andrew hip hop Idlozi
  - Delulu's child (not destiny's child) - Electrotechnics Engineer Abongile -> Kwa Zulu & Snr AWS Cloud Engineer Mohlakoane -> Basetsana babapedi
  - Group Leader Tshabalala
  - Mudhara Kayz
  - Zim dancehall
  - Jared, Nepo,  Gamers GG & Royal College (Anime)
  - Morena aka Moreezy (Classics)
  - Mama
  - Baba
  - Kundi, Uzozisola, Winky, Lambo mercy
    - Foot's wife
  - Charlene & Primrose (My Sisters)
  - Taps
  - Amai Aku
  - Yongama
  - Amber (Daft punk)
  - High class papi
  - Ashley
  - Risky Life Holy Ten
  - Need to ask Trevor
  - Kung Fu Kenny -> Money tress, mad city, the heart part 4, mortal man

  # DEMO

  Ufunani
  Musazvituma / Time (Holy)
  Intro + Steve Biko + Award Tour(Tribe called quest) - Displays auto next
  Uzozisola
  As it was
  M.A.A.D City
  Money Tress
  Neighbors
  It aint hard to tell (Nas)
  Something About us

  # Improvements

  - API -> Database -> AWS S3 or any storage solution
      Would allow us to implement features like 'likes', 'comments' & 'playlists'
      Normal user could have their own dashboard where they can manage their liked songs, playlists & perform CRUD ops on those things
      API & DB would also allow user accounts and we can could implement a Artsists dashborard where they can perform CRUD on their songs, albums etc..
  - Auto swipe to the Song controller when dialogue is open, (Swiper is fustrating)
  - Onswipe, the bar thing should also move to indicate to the user which section of swiper they on
  - The scroll input isn't working due to swiper taking over when a user wants to scroll.
  - Make PWA
*/

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

  const [audioPlayDialogOpen, setAudioPlayDialogOpen] = useState(false);

  const defaultSlide = currentPlaylist ? 1 : 0;
  const [activeSlide, setActiveSlide] = useState(defaultSlide);

  const { desktop } = useScreen();

  const audioPlayer = useRef<HTMLAudioElement>(null);

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

  const { width } = useWindowDimensions();
  let slidesPerView = 3;
  if (width < 768) slidesPerView = 1;
  else if (width < 1280) slidesPerView = 2;

  const jumpTo = {
    millisecond(millisecond: number) {
      if (currentSong && audioPlayer.current) {
        if (millisecond < 0 || millisecond > currentSong?.duration) {
          throw new Error(
            `time cannot exceed the duration of the song (${currentSong?.duration}ms)`
          );
        }

        audioPlayer.current.currentTime = millisecond / 1000;
      }
    },

    second(second: number) {
      if (currentSong && audioPlayer.current) {
        if (second < 0 || second > currentSong?.duration / 1000) {
          throw new Error(
            `time cannot exceed the duration of the song (${
              currentSong?.duration / 1000
            }s)`
          );
        }

        audioPlayer.current.currentTime = second;
      }
    },
  };

  return (
    <songContext.Provider
      value={{
        playlist: currentPlaylist,
        current: currentSong,
        time: songTime,
        lyrics,
        controls: {
          expand() {
            setAudioPlayDialogOpen(true);
          },
          collapse() {
            setAudioPlayDialogOpen(false);
          },
          expanded: audioPlayDialogOpen,
          songTime,
          isPlaying: audioPlaying,
          play() {
            return audioPlayer.current?.play();
          },
          pause() {
            audioPlayer.current?.pause();
          },
          playPause: handlePlayPause,
          jumpTo,
        },
        playSong({ song, playlist }) {
          audioPlayer.current?.pause();

          setCurrentPlaylist(playlist);
          setCurrentSong(song);

          return audioPlayer.current?.play();
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
          <CurrentSongProgress className='mb-2' />

          <div id='audio-controls' className='mx-auto max-w-2xl'>
            {/* song info */}
            <div className='flex gap-2 w-full items-center'>
              <Dialog.Root
                open={audioPlayDialogOpen}
                onOpenChange={setAudioPlayDialogOpen}
              >
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
                      <Artists
                        artists={currentSong.artists}
                        className='text-gray-600 text-sm'
                      />
                    </div>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Content className='w-screen h-screen flex flex-col items-center fixed bg-white z-50 left-0 top-0'>
                    <div className='w-full max-w-md px-4 flex items-center justify-between border-b mb-2'>
                      <div
                        className={cn('rounded-full w-[72px] bg-blue-200', {
                          invisible: desktop,
                        })}
                      >
                        <div
                          data-slide={activeSlide}
                          data-slide-per-view={slidesPerView}
                          className='block w-6 h-1 bg-blue-500 rounded-full transition-transform duration-300 data-[slide-per-view=2]:w-12 data-[slide-per-view=2]:bg-red-500 data-[slide=1]:translate-x-[24px] data-[slide=2]:translate-x-[48px]'
                        />
                      </div>

                      <div className='flex items-center'>
                        <Dialog.Close asChild>
                          <Button
                            icon={<FiX />}
                            variant='flat'
                            onClick={() => {
                              jumpTo.second(0);
                              setCurrentSong(undefined);
                              setCurrentPlaylist(undefined);
                            }}
                          />
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <Button icon={<FiMinimize2 />} variant='flat' />
                        </Dialog.Close>
                      </div>
                    </div>
                    {/* <div
                      id='desktop'
                      className='hidden xl:flex gap-4 justify-center w-full h-full'
                    >
                      <CurrentPlaylist className='max-w-xs w-full pt-14 border-r pr-2' />

                      <Controls className='max-w-xl' />

                      <Lyrics className='xl:block max-w-lg w-full pt-14' />
                    </div> */}

                    <Swiper
                      slidesPerView={slidesPerView}
                      spaceBetween={16}
                      className='px-4 flex-1 w-full'
                      onSlideChange={(swiper) =>
                        setActiveSlide(swiper.activeIndex)
                      }
                    >
                      <SwiperSlide className='flex justify-center'>
                        {currentPlaylist ? (
                          <CurrentPlaylist className='w-full max-w-md md:max-w-none' />
                        ) : (
                          <p className='text-gray-400 font-bold text-2xl'>
                            Not in playlist
                          </p>
                        )}
                      </SwiperSlide>
                      <SwiperSlide className='flex justify-center'>
                        <Controls className='w-full' />
                      </SwiperSlide>
                      {
                        <SwiperSlide className='flex justify-center'>
                          {lyrics ? (
                            <Lyrics className='w-full max-w-md md:max-w-none' />
                          ) : (
                            <p className='text-gray-400 font-bold text-2xl'>
                              No Lyrics
                            </p>
                          )}
                        </SwiperSlide>
                      }
                    </Swiper>
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
          </div>
        </div>
      )}
    </songContext.Provider>
  );
}

export default App;
