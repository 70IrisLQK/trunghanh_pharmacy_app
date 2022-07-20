import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { editNote, updateNote } from "../../Redux/Actions/NoteActions";
import { listNoteTypes } from "../../Redux/Actions/NoteTypeActions";
import { listPharmacy } from "../../Redux/Actions/PharmacyActions";
import { listUserSales } from "../../Redux/Actions/UserActions";
import { NOTE_UPDATE_RESET } from "../../Redux/Constants/NoteConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import "./style.css";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditNoteDetail = (props) =>
{
  const { noteId } = props;

  const dispatch = useDispatch();
  const noteEdit = useSelector((state) => state.noteEdit);
  const { error: errorEdit, loading: loadingEdit, notes } = noteEdit;
  const userSale = useSelector((state) => state.userSalesList);
  const pharmacy = useSelector((state) => state.pharmacyList);
  const noteType = useSelector((state) => state.noteTypeList);
  const { loading, note_types } = noteType;
  const { loading: loadingPharmacy, pharmacies } = pharmacy;
  const { loading: loadingUser, user_sales } = userSale;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = noteUpdate;

  const [salesName, setSalesName] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [noteTypes, setNoteTypes] = useState("");
  const [description, setDescription] = useState("");
  const [reply, setReply] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (e) =>
  {
    const selectedFiles = e.target.files;
    setFiles(e.target.files);
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) =>
    {
      var blob = URL.createObjectURL(file);
      return blob;
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  useEffect(() =>
  {
    dispatch(listUserSales());
    dispatch(listPharmacy());
    dispatch(listNoteTypes());

    if (successUpdate)
    {
      dispatch({ type: NOTE_UPDATE_RESET });
      toast.success("Đã cập nhật!", ToastObjects);
    } else
    {
      if (notes?.note_id !== noteId)
      {
        dispatch(editNote(noteId));
      } else
      {
        setSalesName(notes.user_id);
        setPharmacyName(notes.pharmacy_id);
        setNoteTypes(notes.note_type_id);
        setDescription(notes.description);
        setReply(notes.reply_note);
        setFiles(notes.image);
      }
    }
  }, [notes, dispatch, noteId, successUpdate]);

  const submitHandler = (e) =>
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append("saleName", salesName);
    formData.append("note_id", noteId);
    formData.append("pharmacyName", pharmacyName);
    formData.append("noteType", noteTypes);
    formData.append("description", description);
    formData.append("reply", reply);
    Object.values(files).forEach((file) =>
    {
      formData.append("uploadImages", file);
    });
    dispatch(updateNote(formData, noteId));
  };
  return (
    <>
      <Toast />
      <div main className="main-wrap">
        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <form onSubmit={submitHandler}>
            <div className="content-header">
              <Link to="/notes" className="btn btn-danger text-white">
                Quay lại ghi chú
              </Link>
              <h2 className="content-title">Phản hồi ghi chú</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Phản hồi ghi chú
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
                    {loading &&
                      loadingEdit &&
                      loadingPharmacy &&
                      loadingUser ? (
                      <Loading />
                    ) : errorEdit ? (
                      <Message variant="alert-danger">{errorEdit}</Message>
                    ) : (
                      <div className="card-body">
                        <div className="mb-4">
                          <label htmlFor="product_price" className="form-label">
                            Người nhận
                          </label>
                          <select
                            className="form-control"
                            onChange={(e) => setSalesName(e.target.value)}
                            value={salesName}
                          >
                            {user_sales?.map((option) => (
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
                            {pharmacies?.map((option) => (
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
                            onChange={(e) => setNoteTypes(e.target.value)}
                            value={noteType}
                          >
                            {note_types?.map((option) => (
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
                          <label className="form-label">Phản hồi</label>
                          <textarea
                            placeholder="Nhập phản hồi"
                            className="form-control"
                            rows="7"
                            required
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                          ></textarea>
                        </div>
                        {selectedImages?.length > 0 &&
                          (selectedImages.length > 5 ? (
                            <p className="error">
                              Không thể tải lên nhiều hơn 5 hình ảnh ! <br />
                              <span>
                                Hãy xóa bớt ảnh
                                <b> {selectedImages.length - 10} </b>
                              </span>
                            </p>
                          ) : null)}
                        <label className="form-label">Hình ảnh</label>
                        <div className="images mb-4">
                          {selectedImages &&
                            selectedImages.map((image, index) =>
                            {
                              return (
                                <div key={image} className="image">
                                  <img src={image} height="200" alt="upload" />
                                  <button
                                    onClick={() =>
                                      setSelectedImages(
                                        selectedImages.filter(
                                          (e) => e !== image
                                        )
                                      )
                                    }
                                  >
                                    Xóa ảnh
                                  </button>
                                  <p>{index + 1}</p>
                                </div>
                              );
                            })}
                        </div>
                        <div className="mb-4">
                          <input
                            className="form-control mt-3"
                            accept="image/png , image/jpeg, image/jpg"
                            type="file"
                            id="file"
                            name="uploadImages"
                            multiple
                            onChange={onSelectFile}
                          />
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

export default EditNoteDetail;
