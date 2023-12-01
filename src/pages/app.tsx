import playlists, { testPlaylist } from '../assets/db/playlists';

import Playlist from '../components/playlist';
import { Song } from '../components/song';

/*
  Make playlists for:

  ! Add artist links
  
 >< Judge me, I don't care (Tineyi & ${original artist's name})
  >< Weeb Nation
  <> Hip Hop
    <> 2014
      >< Songs
      <> Lyrics
    <> TPAB
      >< Songs
      <> Lyrics
    >< GKMC
    <> Nas
      <> World is Yours
      <> Halftime
      <> Represent
      <> It Aint Hard To Tell
    <> A Tribe Called Quest
      <> Steve Biko
      <> Award Tour
      <> We Can Get Down
      <> Electric Relaxation
      <> Oh My God
    <> Digable Planets
      <> Rebirth of Slick
      <> Where I'm From
    <> Scum Fuck Flower Boy
    <> IGOR
  <> Save the semester mode (Momo, Ufunani, Nguwe Wedwa, Long Lasting, Villo)
  <> Sandile Strict Session vol 4
  <> Tanatswa (The Notorious B.E.V)
  - Tanaka & Aneen (Vasikana va mwari)
  - Kudzi (Amai Papa Bear)
  - Rivo (Munghana Rulani & Prince Rhangani)
  - Sesi (Khosikadzi va mavenda)
  - Mpumi, Nkosana, Andrew & Joseph (name: Past Paper Chowers United, playlist: E Les Foyer Cremming) | Andrew hip hop Idlozi
  - Delulu's child (not destiny's child) - Electrotechnics Engineer Abongile -> Kwa Zulu & Snr AWS Cloud Engineer Mohlakoane -> Basetsana babapedi
  - Group Leader Tshabalala
  - Mudhara Kayz
  - Zim dancehall
  - Jared, Nepo,  Gamers GG & Royal College (Anime)
  - Morena aka Moreezy (Classics)
  - Mama
  - Baba
  - Kundi, Uzozisola, Winky, Lambo mercy
  - Charlene & Primrose (My Sisters)
  - Taps
  - Amai Aku
  - Yongama
  - Amber (Daft punk)
  - High class papi
  - Ashley
  - Risky Life Holy Ten
  - Need to ask Trevor
  - Kung Fu Kenny -> Money tress, mad city, the heart part 4, mortal man
  - Lee Letsoso
  - Precious, Paida, Tylon, Rethabile
  - Tshego and the gang (including Leon)
  - Russy and friend
  - Rethabile

  # DEMO

  Ufunani
  Musazvituma / Time (Holy)
  Intro + Steve Biko + Award Tour(Tribe called quest) - Displays auto next
  As it was
  M.A.A.D City
  Money Tress
  Neighbors
  G.O.M.D
  Apparently
  Blue Bird (Naruto)
  It aint hard to tell (Nas)
  Something About us

  # Improvements

  - API -> Database -> AWS S3 or any storage solution
      Would allow us to implement features like 'likes', 'comments' & 'playlists'
      Normal user could have their own dashboard where they can manage their liked songs, playlists & perform CRUD ops on those things
      API & DB would also allow user accounts and we can could implement a Artsists dashborard where they can perform CRUD on their songs, albums etc..
  - Auto swipe to the Song controller when dialogue is open, (Swiper is fustrating)
  - Onswipe, the bar thing should also move to indicate to the user which section of swiper they on
  - The scroll input isn't working due to swiper taking over when a user wants to scroll.
  - Make PWA
  - save song id in session/local storage and the progress for page refresh purposes
*/

function App() {
  return (
    <>
      <h2 className='font-bold text-3xl'>Quick Picks</h2>
      <Song {...testPlaylist.songs[0]} />
      <h2 className='font-bold text-3xl'>Playlists</h2>
      <div>
        {playlists.map((playlist, key) => (
          <Playlist key={key} playlist={playlist} variant='box' />
        ))}
      </div>
      {/* <Playlist
        playlist={testPlaylist}
        className={cn('max-w-md', { 'pb-[74.8px]': Song?.current })}
        searchbar
      /> */}
    </>
  );
}

export default App;
