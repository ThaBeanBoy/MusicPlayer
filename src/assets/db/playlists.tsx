import { playlistType } from '../../types';

import songs from './songs';

export const testPlaylist: playlistType = {
  id: 0,
  title: 'Birthday Playlist',
  cover: '/african-americans-in-america/cover.png',
  songs: [songs[0], songs[1]],
  description: <>Custom description</>,
};

const playlists: playlistType[] = [
  testPlaylist,
  // testPlaylist,
  // testPlaylist,
  // testPlaylist,
  // testPlaylist,
  // testPlaylist,
  // testPlaylist,
  // testPlaylist,
  // testPlaylist,
  {
    id: 1,
    title: "Don't judge me",
    cover: '/african-americans-in-america/cover.png',
    songs: [songs[2], songs[3], songs[4]],
    description: <>Judge me all you want, these songs are bangers 🥲</>,
  },
];

export default playlists;
