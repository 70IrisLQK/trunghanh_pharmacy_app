import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainRoutes from "../components/route/MainRoutes";
const NoteScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainRoutes />
      </main>
    </>
  );
};

export default NoteScreen;
