import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import EditNoteDetail from "./EditNoteDetail";

const EditNoteMain = ({ match }) => {
  const noteId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditNoteDetail noteId={noteId} />
      </main>
    </>
  );
};
export default EditNoteMain;
