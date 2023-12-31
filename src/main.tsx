import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import App from './pages/app.tsx';
import List from './pages/list/app.tsx';
import NotFound from './pages/404.tsx';

import './index.css';

import Layout from './pages/layout.tsx';
import { SongProvider } from './context/song/context.tsx';
import ListError from './pages/list/404.tsx';
import Artist from './pages/artist/app.tsx';
import ArtistError from './pages/artist/404.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout />}>
      <Route path='/' element={<App />} />
      <Route path='list/:id' element={<List />} errorElement={<ListError />} />
      <Route
        path='artist/:id'
        element={<Artist />}
        errorElement={<ArtistError />}
      />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SongProvider>
      <RouterProvider router={router} />
    </SongProvider>
  </React.StrictMode>
);
