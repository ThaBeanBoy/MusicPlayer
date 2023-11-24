import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { playlistType, songType } from '../../types';
import { useSongTime, useSongTimeType } from '../../hooks/Time';
import axios from 'axios';

type contextType = {
  playlist?: playlistType;
  current?: songType;
  time: useSongTimeType;
  lyrics: string | undefined;
  controls: {
    songTime: useSongTimeType;
    isPlaying: boolean;
    play: () => Promise<void> | undefined;
    pause: () => void;
    playPause: () => Promise<void>;
    jumpTo: {
      millisecond: (millisecond: number) => void;
      second: (second: number) => void;
    };
    stopPlaying: () => void;
  };
  dialog: {
    isOpen: boolean;
    isClosed: boolean;
    close: () => void;
    open: () => void;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  // dialog?: songDialogControlsType;
  playSong: (args: {
    song: songType;
    playlist?: playlistType;
    openDialog?: boolean;
  }) => void;
};

const songContext = createContext<contextType | undefined>(undefined);

export default songContext;

export function SongProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<
    playlistType | undefined
  >(undefined);
  const [currentSong, setCurrentSong] = useState<songType | undefined>(
    undefined
  );
  const [lyrics, setLyrics] = useState<string | undefined>(undefined);
  const songTime = useSongTime(currentSong);

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
          songTime,
          isPlaying: audioPlaying,
          play() {
            return audioPlayer.current?.play();
          },
          pause() {
            audioPlayer.current?.pause();
          },
          stopPlaying() {
            jumpTo.second(0);
            setCurrentSong(undefined);
            setCurrentPlaylist(undefined);
          },
          playPause: handlePlayPause,
          jumpTo,
        },
        dialog: {
          isOpen: dialogOpen,
          isClosed: !dialogOpen,
          open() {
            console.log(currentSong);
            if (currentSong === undefined) {
              throw new Error('Need to load a song first');
            }
            setdialogOpen(true);
          },
          close() {
            setdialogOpen(false);
          },
          set: setdialogOpen,
        },
        playSong({ song, playlist, openDialog }) {
          setCurrentPlaylist(playlist);

          console.log(`loading ${song.title}`);
          setCurrentSong(song);

          if (openDialog) {
            setdialogOpen(false);
          }
        },
        // dialog: songDialoguseContext,
      }}
    >
      {' '}
      {children}
      <audio
        src={currentSong?.songUrl}
        preload='metadata'
        ref={audioPlayer}
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
        onTimeUpdate={() => {
          songTime.progress.set.seconds(audioPlayer.current?.currentTime ?? 0);
        }}
        autoPlay
        onEnded={() => {
          // const songIsLast = currentSong.index === songs.length - 1;
          // const nextSongIndex = songIsLast ? 0 : currentSong.index++;
          // setCurrentSong({
          //   index: nextSongIndex,
          //   song: songs[nextSongIndex],
          // });
        }}
      ></audio>
    </songContext.Provider>
  );
}
