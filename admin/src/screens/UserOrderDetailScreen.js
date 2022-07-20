import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import UserDetailMain from "../components/users/UserDetailMain";

const UserOrderDetailScreen = ({ match }) => {
  const userId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserDetailMain userId={userId} />
      </main>
    </>
  );
};

export default UserOrderDetailScreen;
