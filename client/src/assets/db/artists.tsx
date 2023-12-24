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
  {
    id: 9,
    name: 'ASIAN KUNG-FU GENERATION - リライト',
    coverUrl: '/public/artists/asian-kungfu.jpeg',
    description:
      'Asian Kung-Fu Generation is a Japanese alternative rock band formed in Yokohama in 1996. For its entire career, the band has consisted of vocalist Masafumi Gotoh, guitarist Kensuke Kita, bassist Takahiro Yamada, and drummer Kiyoshi Ijichi.',
  },
  { id: 10, name: 'MOB CHOIR' },
  { id: 11, name: 'Sarah Àlainn' },
  { id: 12, name: 'SiM' },
  { id: 13, name: '林ゆうき' },
  { id: 14, name: 'NobodyKnows+' },
  { id: 15, name: 'kankakupiero' },
  { id: 16, name: 'LiSA' },
  { id: 17, name: 'Yui' },
  { id: 18, name: 'Ikimonogakari' },
  { id: 19, name: 'Porno Graffitti' },
  { id: 20, name: 'Kana-Boon' },
  { id: 21, name: 'FLOW' },
  { id: 22, name: 'Long Shot Party' },
  { id: 23, name: 'King Gnu' },
  { id: 24, name: 'J. Cole' },
  { id: 25, name: 'Kendrick Lamar' },
  { id: 26, name: 'Thundercat' },
  { id: 27, name: 'George Clinton' },
  { id: 28, name: 'Bilal' },
  { id: 29, name: 'Anna Wise' },
  { id: 30, name: 'Snoop Dogg' },
  { id: 31, name: 'James Fauntleroy' },
  { id: 32, name: 'Ronald Isley' },
  { id: 33, name: 'Rapsody' },
  { id: 34, name: 'Drake' },
  { id: 35, name: 'MC Eiht' },
  { id: 36, name: 'Dr Dre' },
  { id: 37, name: 'Jay Rock' },
  { id: 38, name: 'Nas' },
  {
    id: 39,
    name: 'DJ Softy',
    coverUrl:
      'https://bev-streams.s3.eu-central-1.amazonaws.com/softy/cover.jpeg',
    description: (
      <>
        <p>
          DJ Softy is currently studying Computer Science & Infos, and he has
          visions of integrating house and amapiano with his very own artificial
          intelligence he's developing
        </p>
        <p>
          Currently negotiating a record contract with Kabaza De Small & Dj
          Maphorisa, this rising star has already accumulated trillions of
          dollars, <b>(yes, US Dollars!! Not Rands like you poverty people)</b>
        </p>
        <p>
          Ladies & gentlemen, his future is looking too bright, there's a rising
          star amongst us👍
        </p>
      </>
    ),
  },
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
  nobody_knows: artists[14],
  kankakupiero: artists[15],
  lisa: artists[16],
  yui: artists[17],
  ikimonogakari: artists[18],
  porno_graffitti: artists[19],
  kana_boon: artists[20],
  flow: artists[21],
  long_shot_party: artists[22],
  king_gnu: artists[23],
  j_cole: artists[24],
  kendrick: artists[25],
  thundercat: artists[26],
  george_clinton: artists[27],
  bilal: artists[28],
  anna_wise: artists[29],
  snoop_dogg: artists[30],
  james_fauntleroy: artists[31],
  ronald_isley: artists[32],
  rapsody: artists[33],
  drake: artists[34],
  mc_eiht: artists[35],
  dr_dre: artists[36],
  jay_rock: artists[37],
  nas: artists[38],
  dj_softy: artists[39],
};

export default artists;
