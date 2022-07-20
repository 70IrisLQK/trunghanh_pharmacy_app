import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainNotes from "../components/notes/MainNotes";
const NoteScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainNotes />
      </main>
    </>
  );
};

export default NoteScreen;
