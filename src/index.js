import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContext } from './context/ChatContext';

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContext>
  </AuthContextProvider>
);
