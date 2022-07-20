import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainNoteType from "../components/notetypes/MainNoteType";
const NoteTypeScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainNoteType />
      </main>
    </>
  );
};

export default NoteTypeScreen;
