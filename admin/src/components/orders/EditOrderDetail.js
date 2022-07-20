import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { editOrder, updateOrder } from "../../Redux/Actions/OrderActions";
import { ORDER_UPDATE_RESET } from "../../Redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditNoteDetail = (props) =>
{
  const { orderId } = props;

  const dispatch = useDispatch();
  const orderEdit = useSelector((state) => state.orderEdit);
  const { error: errorEdit, loading: loadingEdit } = orderEdit;

  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { error: errorUpdate, success: successUpdate } = orderUpdate;

  const [description, setDescription] = useState("");

  useEffect(() =>
  {
    dispatch(editOrder(orderId));
    if (successUpdate)
    {
      dispatch({ type: ORDER_UPDATE_RESET });
      toast.success("Đã cập nhật!", ToastObjects);
    }
  }, [dispatch, orderId, successUpdate]);

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(updateOrder());
  };

  return (
    <>
      <Toast />
      <div main className="main-wrap">
        {loadingEdit ? (
          <Loading />
        ) : errorEdit && errorUpdate ? (
          <Message variant="alert-danger">{errorUpdate}</Message>
        ) : (
          <section className="content-main" style={{ maxWidth: "1200px" }}>
            <form onSubmit={submitHandler}>
              <div className="content-header">
                <Link to="/orders" className="btn btn-danger text-white">
                  Quay lại phiếu đặt hàng
                </Link>
                <h2 className="content-title">Sửa phiếu đặt hàng</h2>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Sửa phiếu đặt hàng
                  </button>
                </div>
              </div>

              <div className="row mb-4 d-flex justify-content-center">
                <div className="col-xl-8 col-lg-8">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
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
                  </div>
                </div>
              </div>
            </form>
          </section>
        )}
      </div>
    </>
  );
};

export default EditNoteDetail;
