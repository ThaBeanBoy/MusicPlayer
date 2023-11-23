import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Layout from './layout';
import { SongProvider } from './context/song/context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SongProvider>
      <Layout>
        <App />
      </Layout>
    </SongProvider>
  </React.StrictMode>
);
