import * as Progress from '@radix-ui/react-progress';
import { cn } from '../utils/cn';
import { useContext } from 'react';
import songContext from '../context/song/context';

export default function CurrentSongProgress({
  className,
}: {
  className?: string;
}) {
  const currentSong = useContext(songContext);

  return currentSong ? (
    <Progress.Root
      className={cn(
        'relative overflow-hidden bg-blue-200 rounded-full w-full h-[2px]',
        className
      )}
    >
      <Progress.Indicator
        className='bg-blue-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
        style={{
          transform: `translateX(-${
            100 - currentSong?.time.progress.get.percentage()
          }%)`,
        }}
      />
    </Progress.Root>
  ) : (
    <></>
  );
}
