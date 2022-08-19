import React, { useRef, useState } from 'react';
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
      <section>
        <ChatRoom />
      </section>
    </div>
  );
};

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign In with google
      </button>
      <p> Respect the community guidelines and PEACE ✌️</p>
    </>
  );
};



const ChatRoom = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25); //chat messages display sequence

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    console.log('Send clicked');
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        <span> ref={dummy}</span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="send"
        ></input>
        <button type="submit" disabled={!formValue}>
          ✉️
        </button>
      </form>
    </>
  );
};

const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            'https://avatars.dicebear.com/api/adventurer/your-custom-seed.svg'
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
};

export default App;
