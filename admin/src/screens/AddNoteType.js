import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddNoteTypeMain from "../components/notetypes/AddNoteTypeMain";

const AddNoteType = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddNoteTypeMain />
      </main>
    </>
  );
};

export default AddNoteType;
