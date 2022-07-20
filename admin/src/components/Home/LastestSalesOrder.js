import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestSalesOrder = (props) =>
{
  const { loading, error, orders } = props;

  return (
    <div className="card-body">
      <h4 className="card-title">Đơn hàng bán hàng gần đây</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  Mã hóa đơn
                </th>
                <th className="text-center" scope="col">
                  Bán hàng
                </th>
                <th className="text-center" scope="col">
                  Tình trạng
                </th>
                <th className="text-center" scope="col">
                  Ngày nhập
                </th>
                <th className="text-center" scope="col">
                  Tổng tiền
                </th>
                <th className="text-center" scope="col">
                  Nợ
                </th>
                <th className="text-center" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((sales) => sales.user.pharmacy_id === null)
                .slice(0, 5)
                .map((order) => (
                  <tr key={order.order_id} className="text-center">
                    <td>
                      <b>{order.order_id.substring(0, 8)}</b>
                    </td>
                    <td>
                      {order ? (order.user ? order.user.fullname : null) : null}
                    </td>
                    <td>
                      {order.status === "Đã giao" ? (
                        <span className="badge rounded-pill alert-success">
                          {order.status}
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-primary">
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td>{moment(order.created_at).format("DD/MM/YYYY")}</td>
                    <td>
                      {order.total_price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      {order.debt_price > 0
                        ? order.debt_price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })
                        : "0 VND"}
                    </td>
                    <td className="d-flex justify-content-end align-item-center">
                      <Link
                        to={`/order/${order.order_id}`}
                        className="text-success"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestSalesOrder;
