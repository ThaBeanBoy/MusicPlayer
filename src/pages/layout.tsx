import { useContext, useState } from 'react';

import { NavLink, Outlet } from 'react-router-dom';

import songContext from '../context/song/context';

import * as Dialog from '@radix-ui/react-dialog';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { FiMinimize2, FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';

import { useScreen } from '../hooks/windowDimensions';

import CurrentSongProgress from '../components/songProgress';
import Button from '../components/button';
import Input from '../components/input';
import { Controls, CurrentPlaylist, Lyrics } from '../context/song/ui';
import { BsFillPlayFill, BsPauseFill, BsSearch } from 'react-icons/bs';
import { Artists } from '../components/song';

export type songDialogControlsType = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

export default function Layout() {
  const Song = useContext(songContext);

  const defaultSlide = Song?.playlist ? 1 : 0;
  const [activeSlide, setActiveSlide] = useState(defaultSlide);

  const screen = useScreen();

  const slidesPerView = screen === 'desktop' ? 3 : screen === 'tablet' ? 2 : 1;

  return (
    // <songDialogContext.Provider
    //   value={{ open, close, isOpen: audioPlayDialogOpen }}
    // >
    <div className='relative w-full min-h-screen'>
      <header className='flex justify-between border-b w-full max-w-6xl mx-auto py-3 mb-4 items-center'>
        {/* <img src='' alt='logo' /> */}
        <NavLink to='/'>
          <span className='text-2xl'>🍰</span>
        </NavLink>

        <Input icon={<BsSearch />} />

        <nav className='capitalize gap-3 items-center hidden sm:flex'>
          <NavLink to='/'>home</NavLink>
        </nav>
      </header>

      <main className='w-full'>{<Outlet />}</main>

      {Song && Song.current && (
        <div
          id='audio-controls-container'
          className='group fixed bottom-0 w-full bg-white z-40 left-1/2 translate-x-[-50%] border-t text-lg px-2 pb-2'
        >
          <CurrentSongProgress className='mb-2' />

          <div id='audio-controls' className='mx-auto max-w-2xl'>
            {/* song info */}
            <div className='flex gap-2 w-full items-center'>
              <Dialog.Root
                open={Song.dialog.isOpen}
                onOpenChange={Song.dialog.set}
              >
                <Dialog.Trigger asChild>
                  <button className='flex flex-1 gap-2 justify-start'>
                    <img
                      src={Song.current.coverUrl}
                      width={56}
                      height={56}
                      className='rounded-lg border'
                      alt='song cover'
                    />

                    <div>
                      <span className='font-bold'>{Song.current.title}</span>
                      <br />
                      <Artists
                        artists={Song.current.artists}
                        className='text-gray-600 text-sm'
                      />
                    </div>
                  </button>
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Content className='w-screen h-screen flex px-4 flex-col items-center fixed bg-white z-50 left-0 top-0'>
                    <div className='w-full max-w-md flex items-center justify-between border-b mb-2'>
                      <div
                        className={cn('rounded-full w-[72px] bg-blue-200', {
                          invisible: screen === 'desktop',
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
                            onClick={() => Song.controls.stopPlaying()}
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
                      <SwiperSlide className='!flex justify-center'>
                        {Song.playlist ? (
                          <CurrentPlaylist className='w-full max-w-md md:max-w-none' />
                        ) : (
                          <p className='text-gray-400 font-bold text-2xl'>
                            Not in playlist
                          </p>
                        )}
                      </SwiperSlide>
                      <SwiperSlide className='!flex justify-center'>
                        <Controls className='w-full' />
                      </SwiperSlide>
                      {
                        <SwiperSlide className='!flex justify-center'>
                          {Song.lyrics ? (
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
                icon={
                  Song.controls.isPlaying ? <BsPauseFill /> : <BsFillPlayFill />
                }
                onClick={Song.controls.playPause}
                className='text-[48px] border-l border-gray-500'
                variant='flat'
              />
            </div>
          </div>
        </div>
      )}
    </div>
    // </songDialogContext.Provider>
  );
}
