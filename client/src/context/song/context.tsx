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
    loadPreviousSong: () => void;
    loadNextSong: () => void;
  };
  dialog: {
    isOpen: boolean;
    isClosed: boolean;
    close: () => void;
    open: () => void;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  // dialog?: songDialogControlsType;
  loadSong: (args: {
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

  const loadSong = ({
    song,
    playlist,
    openDialog,
  }: {
    song: songType;
    playlist?: playlistType;
    openDialog?: boolean;
  }) => {
    setCurrentPlaylist(playlist);

    console.log(`loading ${song.title}`);
    setCurrentSong(song);

    if (openDialog) {
      setdialogOpen(false);
    }
  };

  const currentSongIndex = () => {
    if (currentSong === undefined) throw new Error('No song available');

    if (currentPlaylist === undefined) throw new Error('No playlist available');

    const { songs } = currentPlaylist;

    return songs.map(({ id }) => id).indexOf(currentSong.id);
  };

  const loadNextSong = () => {
    if (currentPlaylist === undefined) throw new Error('No playlist available');

    const { songs } = currentPlaylist;

    const songIndx = currentSongIndex();
    const isLastSong = songIndx === songs.length - 1;

    loadSong({
      song: isLastSong ? songs[0] : songs[songIndx + 1],
      playlist: currentPlaylist,
    });
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
          loadPreviousSong() {
            if (currentPlaylist === undefined)
              throw new Error('No playlist available');

            if (currentSong === undefined) throw new Error('No song available');

            const { songs } = currentPlaylist;

            const songIndx = currentSongIndex();
            const isFirstSong = songIndx === 0;

            if (isFirstSong) {
              throw new Error(
                `There is no song before song-${currentSong.id} (${currentSong.title}) in playlist-${currentPlaylist.id} (${currentPlaylist.title}) `
              );
            }
            loadSong({ song: songs[songIndx - 1], playlist: currentPlaylist });
          },
          loadNextSong,
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
        loadSong,
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
        onEnded={loadNextSong}
      ></audio>
    </songContext.Provider>
  );
}
