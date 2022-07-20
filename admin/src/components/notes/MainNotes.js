import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import NotesTable from "./NotesTable";
import { listNotes } from "../../Redux/Actions/NoteActions";
import { Link } from "react-router-dom";

const MainNotes = (props) =>
{
  const dispatch = useDispatch();

  const note = useSelector((state) => state.noteList);
  const { error, loading, notes } = note;

  useEffect(() =>
  {
    dispatch(listNotes());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách ghi chú</h2>
        <div>
          <Link to="addnote" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo mới ghi chú
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
              <NotesTable notes={notes} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNotes;
