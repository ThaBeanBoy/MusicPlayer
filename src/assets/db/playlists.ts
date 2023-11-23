import { playlistType } from '../../types';

import songs from './songs';

export const testPlaylist: playlistType = {
  title: 'Birthday Playlist',
  cover: '/african-americans-in-america/cover.png',
  songs: [songs[0], songs[1]],
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
];

export default playlists;
