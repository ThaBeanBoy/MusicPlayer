import { artistType } from '../../types';

const artists: artistType[] = [
  { id: 0, name: 'Jay-Z', link: 'https://en.wikipedia.org/wiki/Jay-Z' },
  {
    id: 1,
    name: 'Kanye West',
    link: 'https://en.wikipedia.org/wiki/Kanye_West',
  },
  { id: 2, name: 'Kelvin Momo' },
  { id: 3, name: 'Carly Rae Jepsen' },
  { id: 4, name: 'Taylor Swift' },
  { id: 5, name: 'Harry Styles' },
  { id: 6, name: 'Amerie' },
  { id: 7, name: 'The Weeknd' },
  { id: 8, name: 'IAMDDB' },
  { id: 9, name: 'ASIAN KUNG-FU GENERATION - リライト' },
  { id: 10, name: 'MOB CHOIR' },
  { id: 11, name: 'Sarah Àlainn' },
  { id: 12, name: 'SiM' },
  { id: 13, name: '林ゆうき' },
];

export const artistNames = {
  jayz: artists[0],
  kanye: artists[1],
  kelvin_momo: artists[2],
  carly_rae_Jepsen: artists[3],
  taylor_swift: artists[4],
  harry_styles: artists[5],
  amerie: artists[6],
  the_weeknd: artists[7],
  iamddb: artists[8],
  asian_kung_fu_generation: artists[9],
  mob_choir: artists[10],
  sarah_alainn: artists[11],
  sim: artists[12],
  mha: artists[13],
};

export default artists;
