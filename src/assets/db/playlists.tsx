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
  {
    id: 1,
    title: "Don't judge me",
    cover: '/playlist-covers/me.jpeg',
    songs: [
      songs[2],
      songs[3],
      songs[4],
      songs[5],
      songs[6],
      songs[7],
      songs[8],
      songs[9],
      songs[10],
    ],
    description: <>Judge me all you want, these songs are bangers 🥲</>,
  },
  {
    id: 2,
    title: 'Weeb Nation',
    cover: '/playlist-covers/weeb-nation.jpg',
    songs: [
      songs[11],
      songs[12],
      songs[13],
      songs[14],
      songs[15],
      songs[16],
      songs[17],
      songs[18],
      songs[19],
      songs[20],
      songs[21],
      songs[22],
      songs[23],
      songs[24],
      songs[25],
      songs[26],
      songs[27],
    ],
    description: <>For the weebs</>,
  },
];

export default playlists;
