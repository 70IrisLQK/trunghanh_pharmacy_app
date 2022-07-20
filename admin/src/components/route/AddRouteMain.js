import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoute } from "../../Redux/Actions/RouteAction.js";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { ROUTE_UPDATE_RESET } from "../../Redux/Constants/RouteConstants.js";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddRouteMain = (props) => {
  const { pharmacies, users, loadingUser, loadingPharmacy } = props;

  const dispatch = useDispatch();

  const routeCreate = useSelector((state) => state.routeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = routeCreate;

  const fullname = users ? (users[0] ? users[0].user_id : "") : "";
  const pharmacy = pharmacies
    ? pharmacies[0]
      ? pharmacies[0].pharmacy_id
        ? pharmacies[0].pharmacy_id
        : ""
      : ""
    : "";
  const [salesName, setSalesName] = useState(fullname);
  const [pharmacyName, setPharmacyName] = useState(pharmacy);
  const [routeName, setRouteName] = useState("");
  const [status, setStatus] = useState("Chờ xác nhận");
  const [weekDate, setWeekDate] = useState("Monday");
 
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ROUTE_UPDATE_RESET });
      toast.success("Tạo thành công tuyến đường", ToastObjects);
      setRouteName('')
    }
  }, [dispatch, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createRoute(salesName, pharmacyName, routeName, weekDate, status));
  };

  return (
    <>
      <Toast />
      <div main className="main-wrap">
        {loadingPharmacy && loadingUser && loadingCreate ? (
          <Loading />
        ) : errorCreate ? (
          <Message variant="alert-danger">{errorCreate}</Message>
        ) : (
          <section className="content-main" style={{ maxWidth: "1200px" }}>
            <form onSubmit={submitHandler}>
              <div className="content-header">
                <Link to="/routes" className="btn btn-danger text-white">
                  Quay lại tuyến đường
                </Link>
                <h2 className="content-title">Tạo tuyến đường mới</h2>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Tạo tuyến đường
                  </button>
                </div>
              </div>

              <div className="row mb-4 d-flex justify-content-center">
                <div className="col-xl-8 col-lg-8">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      {errorCreate && (
                        <Message variant="alert-danger">{errorCreate}</Message>
                      )}
                      {loadingCreate && <Loading />}
                      <div className="mb-4">
                        <label className="form-label">Tên tuyến đường</label>
                        <textarea
                          placeholder="Nhập miêu tả"
                          className="form-control"
                          rows="2"
                          required
                          value={routeName}
                          onChange={(e) => setRouteName(e.target.value)}
                        ></textarea>
                      </div>
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
                          Trạng thái
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                        >
                          <option value="Chờ xác nhận">Chờ xác nhận</option>
                          <option value="Đã xác nhận">Đã xác nhận</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Ngày trong tuần
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => setWeekDate(e.target.value)}
                          value={weekDate}
                        >
                          <option value="Monday">Thứ 2</option>
                          <option value="Tuesday">Thứ 3</option>
                          <option value="Wednesday">Thứ 4</option>
                          <option value="Thursday">Thứ 5</option>
                          <option value="Friday">Thứ 6</option>
                          <option value="Saturday">Thứ 7</option>
                        </select>
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

export default AddRouteMain;
