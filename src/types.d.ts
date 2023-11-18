export type artistType = {
  name: string;
  link?: string;
};

export type songType = {
  id: number;
  title: string;
  artists: artistType[];
  features: artistType[];
  coverUrl: string;
  songUrl: string;
  duration: number;
  lyricsUrl?: string;
};

export type playlistType = {
  title: string;
  cover?: string;
  songs: songType[];
};
