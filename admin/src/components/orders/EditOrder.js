
import React from "react";
import Header from "../Header";
import Sidebar from "../sidebar";
import EditOrderDetail from "./EditOrderDetail";

const EditOrder = ({ match }) =>
{
    const orderId = match.params.id;

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <EditOrderDetail orderId={orderId} />
            </main>
        </>
    );
};
export default EditOrder;
