import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTransactionById } from "../../Redux/Actions/TransactionActions";
const UserDetailOrder = (props) =>
{
  const { users } = props;
  const orders = users.order;
  const dispatch = useDispatch();

  useEffect(() =>
  {
    dispatch(getTransactionById(orders.order_id));
  }, [dispatch])


  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "10%" }}>STT</th>
          <th style={{ width: "20%" }}>Mã hóa đơn</th>
          <th style={{ width: "20%" }}>Ngày mua</th>
          <th style={{ width: "20%" }}>SL hàng hóa</th>
          <th style={{ width: "20%" }}>Tổng tiền</th>
          <th style={{ width: "20%" }}>Nợ</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/order/${item.order_id}`}>
                {item.order_id.substring(0, 8)}
              </Link>
            </td>
            <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
            <td>{item.quantity}</td>
            <td>
              {item.total_price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </td>
            <td>
              {item.debt_price > 0
                ? item.debt_price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })
                : "(Chưa có)"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserDetailOrder;
