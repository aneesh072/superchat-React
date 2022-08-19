import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyC2fPjlQsfi-MWKJdRhmNNyGmpiGLgKPW4',
  authDomain: 'chat-app-react-187d8.firebaseapp.com',
  projectId: 'chat-app-react-187d8',
  storageBucket: 'chat-app-react-187d8.appspot.com',
  messagingSenderId: '1011226947235',
  appId: '1:1011226947235:web:82bc5f176ef7eb3adc1916',
  measurementId: 'G-PQN6MEYCFP',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1> Welcome To the Chat Room</h1>
      </header>
      <section></section>
    </div>
  );
};



export default App;
