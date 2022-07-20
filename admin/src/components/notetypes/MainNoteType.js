import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listNoteTypes } from "../../Redux/Actions/NoteTypeActions";
import { Link } from "react-router-dom";
import NoteTypeTable from "./NoteTypeTable";

const MainNotes = (props) => {
  const dispatch = useDispatch();

  const noteTypeList = useSelector((state) => state.noteTypeList);
  const { error, loading, note_types } = noteTypeList;

  useEffect(() => {
    dispatch(listNoteTypes());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách lọai ghi chú</h2>
        <div>
          <Link to="add_notetype" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo mới loại ghi chú
          </Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Notes table */}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <NoteTypeTable note_types={note_types} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNotes;
