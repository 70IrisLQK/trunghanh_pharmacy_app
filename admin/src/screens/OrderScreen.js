import React, { useEffect } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderMain from "../components/orders/OrderMain";
import { useDispatch } from 'react-redux'
import { listProducts } from "../Redux/Actions/ProductActions";
import { listOrders } from "../Redux/Actions/OrderActions";
import { listNotes } from "../Redux/Actions/NoteActions";
const OrderScreen = () =>
{
  const dispatch = useDispatch()
  useEffect(() =>
  {
    dispatch(listProducts());
    dispatch(listOrders());
    dispatch(listNotes());

  }, [dispatch])

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain />
      </main>
    </>
  );
};

export default OrderScreen;
