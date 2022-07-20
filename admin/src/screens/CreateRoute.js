import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
const CreateRoute = () =>
{
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
            </main>
        </>
    );
};

export default CreateRoute;