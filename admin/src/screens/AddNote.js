import React, { useEffect } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddNoteMain from "../components/notes/AddNoteMain";
import { useDispatch, useSelector } from "react-redux";
import { listNoteTypes } from "../Redux/Actions/NoteTypeActions";
import { listPharmacy } from "../Redux/Actions/PharmacyActions";
import { listUserSales } from "../Redux/Actions/UserActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";

const AddNote = () => {
  const dispatch = useDispatch();

  const userSale = useSelector((state) => state.userSalesList);
  const pharmacy = useSelector((state) => state.pharmacyList);
  const noteType = useSelector((state) => state.noteTypeList);
  const { error, loading, note_types } = noteType;
  const {
    error: errorPharmacy,
    loading: loadingPharmacy,
    pharmacies,
  } = pharmacy;
  const { error: errorUser, loading: loadingUser, user_sales } = userSale;
  useEffect(() => {
    dispatch(listUserSales());
    dispatch(listPharmacy());
    dispatch(listNoteTypes());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {loading && loadingPharmacy && loadingUser ? (
          <Loading />
        ) : error && errorPharmacy && errorUser ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <AddNoteMain
            note_types={note_types}
            pharmacies={pharmacies}
            users={user_sales}
            loadingNotes={loading}
            loadingUser={loadingUser}
            loadingPharmacy={loadingPharmacy}
          />
        )}
      </main>
    </>
  );
};

export default AddNote;
