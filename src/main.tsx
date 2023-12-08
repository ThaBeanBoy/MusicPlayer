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

import { SongProvider } from './context/song/context.tsx';
import { AuthProvider } from './context/auth.tsx';

import Layout from './pages/layout.tsx';
import ListError from './pages/list/404.tsx';
import Artist from './pages/artist/app.tsx';
import ArtistError from './pages/artist/404.tsx';
import UserInfo from './pages/dashboard/app.tsx';

import AuthLayout from './pages/auth/layout.tsx';
import SignUp from './pages/auth/signUp.tsx';
import Login from './pages/auth/login.tsx';
import { ToastProvider } from './context/toast.tsx';

import DashboardLayout from './pages/dashboard/layout.tsx';

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

      <Route path='auth' element={<AuthLayout />}>
        <Route path='' element={<Login />} />
        <Route path='sign-up' element={<SignUp />} />
      </Route>

      <Route path='dashboard' element={<DashboardLayout />}>
        <Route path='' element={<UserInfo />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <SongProvider>
          <RouterProvider router={router} />
        </SongProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
