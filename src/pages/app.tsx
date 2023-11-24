import playlists from '../assets/db/playlists';

import { Playlist } from '../components/song';

/*
  Make playlists for:

  ! Add artist links
  
  - Judge me, I don't care (Tineyi & ${original artist's name})
  - Gamers GG (Gta Themes, Nintendo Wii)
  - Hip Hop (M.A.A.D, Cole's library, FPS, Wow freestyle 6 God, It aint hard to tell)
  - Save the semester mode
  - Sandile Strict Session vol 4
  - Tanatswa (Ganster Nkazana - Musikana Wemacider)
  - Tanaka & Aneen (Vasikana va mwari)
  - Kudzi (Amai Papa Bear)
  - Rivo (Munghana Rulani & Prince Rhangani)
  - Sesi (Khosikadzi va mavenda)
  - Mpumi, Nkosana & Andrew (name: Past Paper Chowers United, playlist: E Les Foyer Cremming) | Andrew hip hop Idlozi
  - Delulu's child (not destiny's child) - Electrotechnics Engineer Abongile -> Kwa Zulu & Snr AWS Cloud Engineer Mohlakoane -> Basetsana babapedi
  - Group Leader Tshabalala
  - Mudhara Kayz
  - Zim dancehall
  - Jared, Nepo,  Gamers GG & Royal College (Anime)
  - Morena aka Moreezy (Classics)
  - Mama
  - Baba
  - Kundi, Uzozisola, Winky, Lambo mercy
    - Foot's wife
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

  # DEMO

  Ufunani
  Musazvituma / Time (Holy)
  Intro + Steve Biko + Award Tour(Tribe called quest) - Displays auto next
  Uzozisola
  As it was
  M.A.A.D City
  Money Tress
  Neighbors
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
*/

function App() {
  return (
    <>
      <h2 className='font-bold text-3xl'>Quick Picks</h2>
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
