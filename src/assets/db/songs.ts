import { songType } from '../../types';

const songs: songType[] = [
  {
    id: 0,
    title: 'Ni**as In Paris',
    artists: [
      { name: 'Jay-Z', link: 'https://en.wikipedia.org/wiki/Jay-Z' },
      {
        name: 'Kanye West',
        link: 'https://en.wikipedia.org/wiki/Kanye_West',
      },
    ],
    features: [],
    coverUrl: '/african-americans-in-america/cover.png',
    songUrl: '/african-americans-in-america/song.mp3',
    lyricsUrl: '/african-americans-in-america/lyrics.lrc',
    duration: 232000,
  },
  {
    id: 1,
    title: 'Soul to Soul',
    artists: [{ name: 'Kelvin Momo' }],
    features: [],
    coverUrl: '/soul-to-soul.jpg',
    songUrl: '/soul-to-soul.mp3',
    duration: 481000,
  },
  {
    id: 2,
    title: 'Call Me Maybe',
    artists: [{ name: 'Carly Rae Jepsen' }],
    features: [],
    coverUrl: '/call-me-maybe/cover.jpeg',
    songUrl: '/call-me-maybe/song.mp3',
    lyricsUrl: '/call-me-maybe/lyrics.lrc',
    duration: 194000,
  },
  {
    id: 3,
    title: 'Shake It Off',
    artists: [{ name: 'Taylor Swift' }],
    features: [],
    coverUrl: '/shake-it-off/cover.png',
    songUrl: '/shake-it-off/song.mp3',
    lyricsUrl: '/shake-it-off/lyrics.lrc',
    duration: 220000,
  },
  {
    id: 4,
    title: 'As It Was',
    artists: [{ name: 'Harry Styles' }],
    features: [],
    coverUrl: '/as-it-was/cover.png',
    songUrl: '/as-it-was/song.mp3',
    lyricsUrl: '/as-it-was/lyrics.lrc',
    duration: 168000,
  },
];

export default songs;
