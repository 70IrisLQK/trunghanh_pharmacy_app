import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import
{
  changeOrderStatus, getOrderById,
  getOrderDetails
} from "../../Redux/Actions/OrderActions";
import { listPayments } from "../../Redux/Actions/PaymentActions";
import { getTransactionById } from "../../Redux/Actions/TransactionActions";
import { ORDER_STATUS_RESET } from "../../Redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import OrderDetailInfo from "./OrderDetailInfo";
import OrderDetailProducts from "./OrderDetailProducts";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const OrderDetailMain = (props) =>
{
  const { orderId } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const orderDetails = useSelector((state) => state.orderDetails);
  const listPayment = useSelector((state) => state.paymentList);
  const orders = useSelector((state) => state.orderByID);
  const transaction = useSelector((state) => state.transactionByOrderID);
  const { loading, error, order } = orderDetails;
  const { loading: loadingPayment, payments } = listPayment;
  const { transactions, loading: loadingTransaction } = transaction;
  const orderStatus = useSelector((state) => state.orderStatus);
  const {
    loading: loadingStatus,
    success: successStatus,
    error: errorStatus,
  } = orderStatus;

  useEffect(() =>
  {
    dispatch(getOrderDetails(orderId));
    dispatch(getOrderById(orderId));
    dispatch(listPayments());
    dispatch(getTransactionById(orderId));
    if (successStatus)
    {
      dispatch({ type: ORDER_STATUS_RESET });
      toast.success("Tình trạng đơn hàng đã thay đổi thành công", ToastObjects);
      window.location.reload();
    }
  }, [dispatch, orderId, successStatus]);

  const [currentSelect, setCurrentSelect] = useState("Chờ xác nhận");

  const changeSelect = (newSelect) =>
  {
    setCurrentSelect(newSelect);
  };

  const submitHandler = (e) =>
  {
    e.preventDefault();
    dispatch(
      changeOrderStatus({
        order_id: orderId,
        status: currentSelect,
      })
    );
  };
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <button className="btn btn-dark text-white" onClick={history.goBack}>
            Quay lại
          </button>
        </div>
        {errorStatus && <Message variant="alert-danger">{errorStatus}</Message>}
        {loadingStatus && <Loading />}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="card">
            <header className="card-header p-3 mb-3 bg-success">
              <div className="row align-items-center ">
                <div className="col-lg-6 col-md-6">
                  <span>
                    <i className="far fa-calendar-alt mx-2"></i>
                    <b className="text-white">
                      {moment(order.created_at).format("DD/MM/YYYY, hh:mm:ss")}
                    </b>
                  </span>
                  <br />
                  <small className="text-white mx-3 ">
                    Mã đơn hàng: {orderId.substring(0, 8)}
                  </small>
                </div>
                <form onSubmit={submitHandler}>
                  <div>
                    <div className=" ms-auto d-flex justify-content-end" >
                      <label className="text-white mx-3 ">Thay đổi trạng thái</label>
                    </div>
                    <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center " >
                      <select
                        className="form-select d-inline-block"
                        style={{ maxWidth: "200px" }}
                        onChange={(e) => changeSelect(e.target.value)}
                        value={currentSelect}
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã xác nhận">Đã xác nhận</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                      <button className="btn btn-primary ms-1" type="submit">
                        <i className="fas fa-print"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </header>
            <div className="card-body">
              {/* Order info */}
              <OrderDetailInfo order={orders} loading={loading} />

              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <OrderDetailProducts
                      order={order}
                      loading={loadingPayment}
                      loadingTransaction={loadingTransaction}
                      orders={orders.order}
                      payments={payments}
                      transactions={transactions}
                    />
                  </div>
                </div>
                {/* Payment Info */}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderDetailMain;
