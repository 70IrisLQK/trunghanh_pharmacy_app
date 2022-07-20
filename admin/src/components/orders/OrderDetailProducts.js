import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ORDER_DEBT_RESET } from "../../Redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { updateOrderDebt } from "./../../Redux/Actions/OrderActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const OrderDetailProducts = (props) =>
{
  const { order, orders, payments, loading, transactions, loadingTransaction } =
    props;
  const dispatch = useDispatch();
  const [paid, setPaid] = useState(0);
  const [key, setKey] = useState("home");
  const [currentSelect, setCurrentSelect] = useState(
    "cb888d36-40ec-4cbd-a60e-707de4326d30"
  );
  const orderDebt = useSelector((state) => state.orderUpdateDebt);
  const { error, success } = orderDebt;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const changeSelect = (newSelect) =>
  {
    setCurrentSelect(newSelect);
  };

  useEffect(() =>
  {
    if (success)
    {
      dispatch({ type: ORDER_DEBT_RESET });
      toast.success("Thanh toán nợ thành công", ToastObjects);
      window.location.reload();
    }
  }, [dispatch, success]);

  const submitHandler = (e) =>
  {
    e.preventDefault();
    const total_paid = Number(orders[0].paid_price) + Number(paid);
    dispatch(
      updateOrderDebt({
        order_id: orders[0].order_id,
        paid_price: total_paid,
        paid: paid,
        payment_id: currentSelect,
        debt_price: Number(orders[0].debt_price) - Number(paid),
      })
    );
  };

  return (
    <>
      <Toast />
      <table className="table border table-lg">
        <thead>
          <tr className="text-center">
            <th style={{ width: "30%" }}>Tên sản phẩm</th>
            <th style={{ width: "15%" }}>Giá</th>
            <th style={{ width: "15%" }}>Đơn vị</th>
            <th style={{ width: "10%" }}>Số lượng</th>
            <th style={{ width: "20%" }}>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => (
            <tr key={index} className="text-center">
              <td>{item.product.product_name}</td>
              <td>
                {(1 * item.price).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td>{item.unit} </td>
              <td>{item.quantity} </td>
              <td>
                {(item.quantity * item.price).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          ))}

          <tr>
            <>
              {error && <Message variant="alert-danger">{error}</Message>}
              {loading && loadingTransaction ? (
                <Loading />
              ) : (
                <td colSpan="6">
                  {orders.map((item, index) =>
                  {
                    return (
                      <article className="float-end" key={index}>
                        <Tabs
                          id="controlled-tab-example"
                          activeKey={key}
                          onSelect={(k) => setKey(k)}
                          className="mb-3"
                        >
                          <Tab eventKey="home" title="Thanh toán">
                            <dl className="dlist">
                              <dt>Tổng tiền hàng:</dt>
                              <dd>
                                <b className="h5">
                                  {(
                                    item.total_price + item.discount_price
                                  ).toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Chiết khấu:</dt>
                              <dd>
                                <b className="h5">
                                  {item.discount_price > 0
                                    ? item.discount_price.toLocaleString(
                                      "it-IT",
                                      {
                                        style: "currency",
                                        currency: "VND",
                                      }
                                    )
                                    : "0 VND"}
                                </b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Tổng cộng:</dt>
                              <dd>
                                <b className="h5">
                                  {item.total_price.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Đã thanh toán:</dt>
                              <dd>
                                <b className="h5">
                                  {" "}
                                  {item.paid_price > 0
                                    ? item.paid_price.toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                    : "0 VND"}
                                </b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Còn nợ:</dt>
                              <dd>
                                <b className="h5">
                                  {item.debt_price > 0
                                    ? item.debt_price.toLocaleString("it-IT", {
                                      style: "currency",
                                      currency: "VND",
                                    })
                                    : "0"}
                                </b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Trạng thái:</dt>
                              <dd>
                                {item.status === "Đã giao" ? (
                                  <span className="badge rounded-pill alert-success">
                                    {item.status}
                                  </span>
                                ) : (
                                  <span className="badge rounded-pill alert-primary">
                                    {item.status}
                                  </span>
                                )}
                              </dd>
                            </dl>
                            {userInfo.user.role_id !==
                              "B896936E-EF5A-4332-8872-46301343805C" ? (
                              item.debt_price > 0 ? (
                                <>
                                  <form onSubmit={submitHandler}>
                                    <dl className="dlist">
                                      <dt>Thanh toán:</dt>
                                      <dd>
                                        <input
                                          type="number"
                                          required
                                          value={paid}
                                          onChange={(e) =>
                                            setPaid(e.target.value)
                                          }
                                        />
                                      </dd>
                                    </dl>
                                    <dl className="dlist">
                                      <dt>Phương thức:</dt>
                                      <dd>
                                        <select
                                          className="form-select d-inline-block"
                                          style={{ maxWidth: "200px" }}
                                          onChange={(e) =>
                                            changeSelect(e.target.value)
                                          }
                                          value={currentSelect}
                                        >
                                          {payments?.map((option) => (
                                            <option value={option.payment_id}>
                                              {option.name}
                                            </option>
                                          ))}
                                        </select>
                                      </dd>
                                    </dl>
                                    <dl className="dlist">
                                      <dd>
                                        {paid <= item.debt_price &&
                                          paid >= 0 ? (
                                          <Button
                                            variant="warning"
                                            type="submit"
                                          >
                                            Thanh toán nợ
                                          </Button>
                                        ) : (
                                          alert(
                                            "Tiền thanh toán không lớn hơn còn nợ"
                                          )
                                        )}
                                      </dd>
                                    </dl>
                                  </form>
                                </>
                              ) : null
                            ) : null}
                          </Tab>
                          <Tab eventKey="profile" title="Lịch sử">
                            <table className="table border table-lg">
                              <thead>
                                <tr>
                                  <th style={{ width: "30%" }}>STT</th>
                                  <th style={{ width: "50%" }}>
                                    Ngày thanh toán
                                  </th>
                                  <th style={{ width: "20%" }}>Số tiền</th>
                                  <th style={{ width: "40%" }}>Hình thức</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transactions?.map((item, index) =>
                                {
                                  return (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {moment(item.created_at).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </td>
                                      <td>
                                        {item.paid_price > 0
                                          ? item.paid_price.toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND'
                                          : "0"}
                                      </td>
                                      <td>
                                        {item
                                          ? item.payment
                                            ? item.payment.name
                                            : null
                                          : null}{" "}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </Tab>
                        </Tabs>
                      </article>
                    );
                  })}
                </td>
              )}
            </>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderDetailProducts;
