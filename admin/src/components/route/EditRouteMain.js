import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import EditRouteDetail from "./EditRouteDetail";

const EditRouteMain = ({ match }) => {
  const routeId = match.params.id;
  console.log(routeId)
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditRouteDetail routeId={routeId} />
      </main>
    </>
  );
};
export default EditRouteMain;
