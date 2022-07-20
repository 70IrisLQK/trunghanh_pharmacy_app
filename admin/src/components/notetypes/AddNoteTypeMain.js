import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createNoteType } from "../../Redux/Actions/NoteTypeActions";
import { NOTE_TYPE_CREATE_RESET } from "../../Redux/Constants/NoteTypeConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddNoteTypeMain = () => {
  const noteTypeCreate = useSelector((state) => state.noteTypeCreate);
  const { loading, error, note_types } = noteTypeCreate;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (note_types) {
      toast.success("Tạo ghi chú thành công", ToastObjects);
      dispatch({ type: NOTE_TYPE_CREATE_RESET });
      setName("");
      setDescription("");
    }
  }, [note_types, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteType(name, description));
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/notetypes" className="btn btn-danger text-white">
              Quay lại loại ghi chú
            </Link>
            <h2 className="content-title">Thêm loại ghi chú mới</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Tạo loại ghi chú
              </button>
            </div>
          </div>

          <div className="row mb-4 d-flex justify-content-center">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label className="form-label">Tên loại ghi chú</label>
                    <textarea
                      placeholder="Nhập tên loại ghi chú"
                      className="form-control"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Miêu tả</label>
                    <textarea
                      placeholder="Nhập phản hồi"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default AddNoteTypeMain;
