import React, { useEffect } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddRouteMain from "../components/route/AddRouteMain";
import { useDispatch, useSelector } from "react-redux";
import { listPharmacy } from "../Redux/Actions/PharmacyActions";
import { listUserSales } from "../Redux/Actions/UserActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const AddRoute = () => {
  const dispatch = useDispatch();

  const userSale = useSelector((state) => state.userSalesList);
  const pharmacy = useSelector((state) => state.pharmacyList);
  const {
    error: errorPharmacy,
    loading: loadingPharmacy,
    pharmacies,
  } = pharmacy;
  const { error: errorUser, loading: loadingUser, user_sales } = userSale;
  useEffect(() => {
    dispatch(listUserSales());
    dispatch(listPharmacy());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {loadingPharmacy && loadingUser ? (
          <Loading />
        ) : errorPharmacy && errorUser ? (
          <Message variant="alert-danger">{errorPharmacy}</Message>
        ) : (
          <AddRouteMain
            pharmacies={pharmacies}
            users={user_sales}
            loadingUser={loadingUser}
            loadingPharmacy={loadingPharmacy}
          />
        )}
      </main>
    </>
  );
};

export default AddRoute;
