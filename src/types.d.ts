export type songType = {
  id: number;
  title: string;
  artists: string[];
  features: string[];
  coverUrl: string;
  songUrl: string;
  duration: number;
};

export type playlistType = {
  title: string;
  cover?: string;
  songs: songType[];
};
