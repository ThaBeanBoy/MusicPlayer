import { playlistType } from '../../types';

import songs from './songs';

export const testPlaylist: playlistType = {
  id: 0,
  title: 'Birthday Playlist',
  cover:
    'https://bev-streams.s3.eu-central-1.amazonaws.com/african-americans-in-america/cover.png',
  songs: [songs[0], songs[1]],
  description: <>Custom description</>,
};

const playlists: playlistType[] = [
  testPlaylist,
  {
    id: 1,
    title: "Don't judge me",
    cover:
      'https://bev-streams.s3.eu-central-1.amazonaws.com/playlist-covers/me.jpeg',
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
    cover:
      'https://bev-streams.s3.eu-central-1.amazonaws.com/playlist-covers/weeb-nation.jpg',
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
  {
    id: 3,
    title: '2014 Forest Hills Drive',
    cover: 'https://bev-streams.s3.eu-central-1.amazonaws.com/2014/cover.png',
    songs: [
      songs[29],
      songs[28],
      songs[30],
      songs[31],
      songs[32],
      songs[33],
      songs[34],
      songs[35],
      songs[36],
      songs[37],
      songs[38],
      songs[39],
      songs[40],
    ],
  },
];

export default playlists;
