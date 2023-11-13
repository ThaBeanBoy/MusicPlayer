import React, { useEffect, useRef, useState } from 'react';
import perry from './assets/perry.jpg';
import { BsFillPlayFill, BsPauseFill, BsSearch } from 'react-icons/bs';
import { AiFillCaretLeft } from 'react-icons/ai';

import './audioControls.css';

import { useInput } from './input';

type songType = {
  title: string;
  artists: string[];
  features: string[];
  coverUrl: string;
  songUrl: string;
  duration: number;
};

const songs: songType[] = [
  {
    title: 'Homies in Paris',
    artists: ['Jay-Z', 'Kanye West'],
    features: [],
    coverUrl: '/african-americans-in-america.png',
    songUrl: '/african-americans-in-america.mp3',
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

function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = (millis % 60000) / 1000;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
}

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
  const [audioPlayerExpanded, setaudioPlayerExpanded] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<
    { index: number; song: songType } | undefined
  >(undefined);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [audioTime, setaudioTime] = useState(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const audioProgressBar = useRef<HTMLInputElement>(null);

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
        <button className='ml-auto'>share</button>
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

      <ul className='pb-[105px]'>
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
          className='group fixed bottom-0 w-full bg-white z-50 left-1/2 translate-x-[-50%] border-t text-lg px-2 py-2'
          data-aria-expanded={audioPlayerExpanded}
          data-expanded={audioPlayerExpanded}
        >
          <div id='audio-controlls' className='mx-auto max-w-2xl'>
            <div className='group-[[data-expanded="true"]]:hidden w-full mb-3 flex gap-3 items-center text-sm'>
              <span>{millisToMinutesAndSeconds(audioTime)}</span>
              <input
                type='range'
                id='seek-slider'
                max='100'
                defaultValue={(audioTime / currentSong.song.duration) * 100}
                className='w-full block flex-1'
                ref={audioProgressBar}
                onChange={(e) => {
                  if (audioPlayer.current) {
                    audioPlayer.current.currentTime =
                      (parseInt(e.currentTarget.value) / 100) *
                      (currentSong.song.duration / 1000);
                  }
                }}
              />
              <span>
                {millisToMinutesAndSeconds(currentSong.song.duration)}
              </span>
            </div>

            {/* song info */}
            <div className='flex gap-2 w-full items-center'>
              <button className='flex flex-1 gap-2 justify-start'>
                <img
                  src={currentSong.song.coverUrl}
                  width={56}
                  height={56}
                  className='rounded-lg border'
                  alt='song cover'
                />

                <div>
                  <span className='font-bold'>{currentSong.song.title}</span>
                  <br />
                  <span className='text-gray-600 text-sm'>
                    {displayArtists(currentSong.song.artists)}
                  </span>
                </div>
              </button>

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
                setaudioTime((audioPlayer.current?.currentTime ?? 0) * 1000);
                if (audioProgressBar.current !== null) {
                  audioProgressBar.current.value = (
                    (audioTime / currentSong.song.duration) *
                    100
                  ).toString();
                }
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
