export type artistType = {
  id: number;
  name: string;
  link?: string;
  coverUrl?: string;
  profileUrl?: string;
  description?: string;
};

export type personType = {
  id: number;
  name: string;
  aliases: string[];
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
  id: number;
  title: string;
  cover?: string;
  songs: songType[];
  description?: React.ReactNode;
  for?: personType;
};
