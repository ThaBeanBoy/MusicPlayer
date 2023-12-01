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
      string: milliTimeStringBuilderType;
    };
  };
  duration: {
    get: {
      milliseconds: () => number;
      seconds: () => number;
      string: milliTimeStringBuilderType;
    };
  };
  setSong: (song: songType) => useSongTimeType;
};

export type milliTimeType = {
  hours: number;
  minutes: number;
  seconds: number;
  string: milliTimeStringBuilderType;
};

export type milliTimeStringBuilderType = (
  args: milliTimeStringBuilderProps
) => string;

type milliTimeStringBuilderProps = {
  displayHours?: boolean;
  displayMinutes?: boolean;
  displaySeconds?: boolean;
  expanded?: boolean;
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
        string: milliTime({ millis: progress, format: 'ms' }).string,
      },
    },

    duration: {
      get: {
        milliseconds: () => progress,
        seconds: () => milliToSeconds(duration),
        string: milliTime({ millis: duration, format: 'ms' }).string,
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

const milliConverstion = {
  hour: 3600000,
  minute: 60000,
  second: 1000,
};

export function milliTime({
  millis,
  format,
}: {
  millis: number;
  format: 'hms' | 'ms' | 's';
}): milliTimeType {
  const hours =
    format === 'hms' ? Math.floor(millis / milliConverstion.hour) : 0;
  millis -= hours * milliConverstion.hour;

  const minutes =
    format === 'hms' || format === 'ms'
      ? Math.floor(millis / milliConverstion.minute)
      : 0;
  millis -= minutes * milliConverstion.minute;

  const seconds = Math.round(millis / milliConverstion.second);

  const string: milliTimeStringBuilderType = ({
    expanded = true,
    displayHours = true,
    displayMinutes = true,
    displaySeconds = true,
  }: milliTimeStringBuilderProps) => {
    const hourString = {
      formated: displayHours
        ? formatValueUnit({ value: hours, unit: 'hour' })
        : '',
      value: displayHours ? hours.toString() : '',
    };

    const minutesString = {
      formated: displayMinutes
        ? formatValueUnit({ value: minutes, unit: 'minute' })
        : '',
      value: displayMinutes ? minutes : '',
    };

    const secondsString = {
      formated: displaySeconds
        ? formatValueUnit({ value: seconds, unit: 'second' })
        : '',
      value: displaySeconds ? seconds.toString() : '',
    };

    if (expanded)
      return `${hourString.formated} ${minutesString.formated} ${secondsString.formated}`;

    switch (format) {
      case 's':
        return secondsString.value;

      case 'ms':
        return `${minutesString.value}:${
          displaySeconds && seconds < 10 ? '0' : ''
        }${secondsString.value}`;

      default:
        return `${hourString.value}:${minutesString.value}:${
          seconds < 10 ? '0' : ''
        }${seconds}`;
    }
  };

  return { hours, minutes, seconds, string };
}

const formatValueUnit = ({ value, unit }: { value: number; unit: string }) =>
  value > 0 ? `${value} ${unit}${value > 1 ? 's' : ''}` : '';
