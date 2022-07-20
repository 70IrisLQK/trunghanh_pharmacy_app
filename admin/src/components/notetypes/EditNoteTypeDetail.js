import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import
  {
    editNoteType,
    updateNoteType,
  } from "../../Redux/Actions/NoteTypeActions";
import { NOTE_TYPE_UPDATE_RESET } from "../../Redux/Constants/NoteTypeConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditNoteTypeDetail = (props) =>
{
  const { noteTypeId } = props;

  const dispatch = useDispatch();
  const noteTypeEdit = useSelector((state) => state.noteTypeEdit);
  const { error: errorEdit, loading: loadingEdit, note_type } = noteTypeEdit;

  const noteTypeUpdate = useSelector((state) => state.noteTypeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = noteTypeUpdate;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() =>
  {
    if (successUpdate)
    {
      dispatch({ type: NOTE_TYPE_UPDATE_RESET });
      toast.success("Đã cập nhật!", ToastObjects);
    } else
    {
      if (note_type?.note_type_id !== noteTypeId)
      {
        dispatch(editNoteType(noteTypeId));
      } else
      {
        setName(note_type?.name);
        setDescription(note_type?.description);
      }
    }
  }, [note_type, dispatch, noteTypeId, successUpdate]);

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(updateNoteType(name, description, noteTypeId));
  };
  return (
    <>
      <Toast />
      <div main className="main-wrap">
        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <form onSubmit={submitHandler}>
            <div className="content-header">
              <Link to="/notetypes" className="btn btn-danger text-white">
                Quay lại loại ghi chú
              </Link>
              <h2 className="content-title">Sửa loại ghi chú</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Sửa loại ghi chú
                </button>
              </div>
            </div>
            <div>
              <div className="row mb-4 d-flex justify-content-center">
                <div className="col-xl-8 col-lg-8">
                  <div className="card mb-4 shadow-sm">
                    {errorUpdate && (
                      <Message variant="alert-danger">{errorUpdate}</Message>
                    )}
                    {loadingUpdate && <Loading />}
                    {loadingEdit ? (
                      <Loading />
                    ) : errorEdit ? (
                      <Message variant="alert-danger">{errorEdit}</Message>
                    ) : (
                      <div className="card-body">
                        <div className="mb-4">
                          <label className="form-label">Tên loại ghi chú</label>
                          <textarea
                            placeholder="Nhập tên loại ghi chú"
                            className="form-control"
                            rows="7"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="form-label">Miêu tả</label>
                          <textarea
                            placeholder="Nhập miêu tả"
                            className="form-control"
                            rows="7"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default EditNoteTypeDetail;
