import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NOTE_CREATE_RESET } from "../../Redux/Constants/NoteConstants";
import { createNote } from "../../Redux/Actions/NoteActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddNoteMain = (props) => {
  const {
    users,
    pharmacies,
    note_types,
    loadingNotes,
    loadingUser,
    loadingPharmacy,
  } = props;
  const fullname = users ? (users[0] ? users[0].user_id : "") : "";
  const pharmacy = users
    ? pharmacies[0]
      ? pharmacies[0].pharmacy_id
      : ""
    : "";
  const note = users ? (note_types[0] ? note_types[0].note_type_id : "") : "";
  const [salesName, setSalesName] = useState(fullname);
  const [pharmacyName, setPharmacyName] = useState(pharmacy);
  const [noteType, setNoteType] = useState(note);

  const [description, setDescription] = useState("");
  const [reply, setReply] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const noteCreates = useSelector((state) => state.noteCreate);
  const { loading, error, notes } = noteCreates;

  useEffect(() => {
    if (notes) {
      toast.success("Tạo ghi chú thành công", ToastObjects);
      dispatch({ type: NOTE_CREATE_RESET });
      setDescription("");
      setReply("");
      setFiles([]);
    }
  }, [notes, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("saleName", salesName);
    formData.append("pharmacyName", pharmacyName);
    formData.append("noteType", noteType);
    formData.append("description", description);
    formData.append("reply", reply);
    Object.values(files).forEach((file) => {
      formData.append("uploadImages", file);
    });

    dispatch(createNote(formData));
  };

  const onChange = (e) => {
    setFiles(e.target.files);
  };

  return (
    <>
      <Toast />
      {loadingNotes && loadingPharmacy && loadingUser ? (
        <Loading />
      ) : (
        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <form onSubmit={submitHandler}>
            <div className="content-header">
              <Link to="/notes" className="btn btn-danger text-white">
                Quay lại ghi chú
              </Link>
              <h2 className="content-title">Thêm ghi chú mới</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Tạo ghi chú
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
                      <label htmlFor="product_price" className="form-label">
                        Người nhận
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => setSalesName(e.target.value)}
                        value={salesName}
                      >
                        {users.map((option) => (
                          <option value={option.user_id}>
                            {option.fullname}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        Tên hiệu thuốc
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => setPharmacyName(e.target.value)}
                        value={pharmacyName}
                      >
                        {pharmacies.map((option) => (
                          <option value={option.pharmacy_id}>
                            {option.CUSTOMER_NAME}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="product_price" className="form-label">
                        Loại ghi chú
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => setNoteType(e.target.value)}
                        value={noteType}
                      >
                        {note_types.map((option) => (
                          <option value={option.note_type_id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
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
                    <div className="mb-4">
                      <label className="form-label">Hình ảnh</label>
                      <input
                        className="form-control mt-3"
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        id="file"
                        name="uploadImages"
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default AddNoteMain;
