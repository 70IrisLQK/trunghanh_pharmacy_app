import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import EditNoteTypeDetail from "./EditNoteTypeDetail";

const EditNoteTypeMain = ({ match }) => {
  const noteTypeId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditNoteTypeDetail noteTypeId={noteTypeId} />
      </main>
    </>
  );
};
export default EditNoteTypeMain;
