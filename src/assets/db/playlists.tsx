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
  {
    id: 4,
    title: 'To Pimp A Butterfly',
    cover: 'https://bev-streams.s3.eu-central-1.amazonaws.com/TPAB/cover.png',
    songs: [
      songs[41],
      songs[42],
      songs[43],
      songs[44],
      songs[45],
      songs[46],
      songs[47],
      songs[48],
      songs[49],
      songs[50],
      songs[51],
      songs[52],
      songs[53],
      songs[54],
      songs[55],
      songs[56],
    ],
  },
  {
    id: 5,
    title: 'Good Kid M.A.A.D City',
    cover: 'https://bev-streams.s3.eu-central-1.amazonaws.com/gkmc/cover.png',
    songs: [
      songs[57],
      songs[58],
      songs[59],
      songs[60],
      songs[61],
      songs[62],
      songs[63],
      songs[64],
      songs[65],
      songs[66],
      songs[67],
      songs[68],
    ],
  },
  {
    id: 6,
    title: "Tineyi's Hip Hop Tracks",
    cover:
      'https://bev-streams.s3.eu-central-1.amazonaws.com/playlist-covers/me.jpeg',
    songs: [
      songs[0],
      songs[33],
      songs[32],
      songs[35],
      songs[36],
      songs[38],
      songs[59],
      songs[61],
      songs[64],
      songs[66],
      songs[67],
      songs[41],
      songs[43],
      songs[47],
      songs[51],
      songs[53],
      songs[56],
      songs[69],
      songs[70],
      songs[71],
      songs[72],
      songs[73],
      songs[74],
      songs[75],
    ],
    description: <>These are some of my favourite hip hop tracks.</>,
  },
  {
    id: 7,
    title: "Softy's Strict Session Volume 4",
    cover: 'https://bev-streams.s3.eu-central-1.amazonaws.com/softy/cover.jpeg',
    songs: [songs[76]],
    description: (
      <>
        <p>
          This mix was made by Sandile aka <b>Dj Softy</b>. For some reason
        </p>
      </>
    ),
  },
];

export default playlists;
