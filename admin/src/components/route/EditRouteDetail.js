import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRoute, updateRoute } from "../../Redux/Actions/RouteAction.js";
import { listPharmacy } from "../../Redux/Actions/PharmacyActions";
import { listUserSales } from "../../Redux/Actions/UserActions";
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

const EditNoteDetail = (props) =>
{
  const { routeId } = props;

  const dispatch = useDispatch();
  const routeEdit = useSelector((state) => state.routeEdit);
  const { error, loading, routes } = routeEdit;

  const route = routes ? (routes.routes ? routes.routes[0] : []) : [];

  const routeNames = route ? (route ? route.name : "") : "";
  const pharmacyId = route ? (route ? route.pharmacy_id : "") : "";
  const sales = route ? (route ? route.user_id : "") : "";
  const statusRoute = route ? (route ? route.status : "") : "";
  const date = route ? (route ? route.weekDate : "") : "";

  const userSale = useSelector((state) => state.userSalesList);
  const pharmacy = useSelector((state) => state.pharmacyList);

  const {
    error: errorPharmacy,
    loading: loadingPharmacy,
    pharmacies,
  } = pharmacy;

  const { error: errorUser, loading: loadingUser, user_sales } = userSale;

  const routeUpdate = useSelector((state) => state.routeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = routeUpdate;

  const [salesName, setSalesName] = useState(sales);
  const [pharmacyName, setPharmacyName] = useState(pharmacyId);
  const [routeName, setRouteName] = useState(routeNames);
  const [status, setStatus] = useState(statusRoute);
  const [weekDate, setWeekDate] = useState(date);

  useEffect(() =>
  {
    dispatch(editRoute(routeId));
    dispatch(listUserSales());
    dispatch(listPharmacy());
    if (successUpdate)
    {
      dispatch({ type: ROUTE_UPDATE_RESET });
      toast.success("Cập nhật thành công!", ToastObjects);
    }
  }, [dispatch, routeId, successUpdate]);

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(
      updateRoute(salesName, pharmacyName, routeName, weekDate, status, routeId)
    );
  };

  return (
    <>
      <Toast />
      <div main className="main-wrap">
        {loading && loadingPharmacy && loadingUser && loading ? (
          <Loading />
        ) : error && errorPharmacy && errorUser && error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <section className="content-main" style={{ maxWidth: "1200px" }}>
            <form onSubmit={submitHandler}>
              <div className="content-header">
                <Link to="/routes" className="btn btn-danger text-white">
                  Quay lại tuyến đường
                </Link>
                <h2 className="content-title">Sửa tuyến đường mới</h2>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Sửa tuyến đường
                  </button>
                </div>
              </div>

              <div className="row mb-4 d-flex justify-content-center">
                <div className="col-xl-8 col-lg-8">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      {errorUpdate && (
                        <Message variant="alert-danger">{errorUpdate}</Message>
                      )}
                      {loadingUpdate && <Loading />}
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
                          {user_sales.map((option) => (
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

export default EditNoteDetail;
