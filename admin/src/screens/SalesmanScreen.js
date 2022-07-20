import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import SalesmanMain from "../components/salesman/SalesmanMain";

const SalesmanScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <SalesmanMain />
      </main>
    </>
  );
};

export default SalesmanScreen;
