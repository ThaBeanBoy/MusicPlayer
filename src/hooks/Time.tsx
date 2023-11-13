import { useState } from 'react';
import { songType } from '../types';

export type useSongTimeType = {
  progress: {
    set: {
      milliseconds: (value: number) => useSongTimeType;
      seconds: (value: number) => useSongTimeType;
      percentage: (value: number) => useSongTimeType;
    };
    get: {
      milliseconds: () => number;
      seconds: () => number;
      percentage: () => number;
      string: () => string;
    };
  };
  duration: {
    get: {
      milliseconds: () => number;
      seconds: () => number;
      string: () => string;
    };
  };
  setSong: (song: songType) => useSongTimeType;
};

export function useSongTime(song?: songType): useSongTimeType {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(song?.duration ?? 0);

  const milliToSeconds = (value: number) => {
    return value / 1000;
  };

  const songTime: useSongTimeType = {
    progress: {
      set: {
        milliseconds: (value: number) => {
          if (value < 0 && duration < value) {
            throw new Error('progress cannot exceed duration');
          }
          setProgress(value);
          return songTime;
        },

        seconds: (value: number) => {
          if (value < 0 && songTime.duration.get.seconds() < value) {
            throw new Error('progress cannot exceed duration');
          }

          setProgress(value * 1000);
          return songTime;
        },

        percentage: (value: number) => {
          if (value < 0 && 100 < value) {
            throw new Error('progress cannot exceed duration');
          }

          setProgress((value / 100) * duration);
          return songTime;
        },
      },
      get: {
        milliseconds: () => progress,
        seconds: () => milliToSeconds(progress),
        percentage: () => (progress / duration) * 100,
        string: () => millisToMinutesAndSeconds(progress),
      },
    },

    duration: {
      get: {
        milliseconds: () => progress,
        seconds: () => milliToSeconds(duration),
        string: () => millisToMinutesAndSeconds(duration),
      },
    },

    setSong: (song?: songType) => {
      if (song) {
        setDuration(song.duration);
      }
      return songTime;
    },
  };

  return songTime;
}

export function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  const seconds = (millis % 60000) / 1000;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
}
