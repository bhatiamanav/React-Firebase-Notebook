import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Navbar from "./components/Navbar";
import NoteAdd from "./components/NoteAdd";
import Notebook from "./components/Notebook";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyARRjV0BcZcG0JjTqDA8hj6c_wVDa94YAg",
  authDomain: "react-firebase-notebook-89e56.firebaseapp.com",
  projectId: "react-firebase-notebook-89e56",
  storageBucket: "react-firebase-notebook-89e56.appspot.com",
  messagingSenderId: "783030666540",
  appId: "1:783030666540:web:1997efdc2b09b32938d889",
  measurementId: "G-79MHYWMCHC"
};
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [noteBookData, setNoteBookData] = useState([]);

  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added", (snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteBookData;
        notebook = noteBookData.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  };

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="note-section">
        <NoteAdd />
        <Notebook notebook={noteBookData} />
      </div>
    </div>
  );
};

export default App;
