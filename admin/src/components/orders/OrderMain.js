import React from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useSelector } from "react-redux";

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">
          Danh sách phiếu đặt hàng ({orders ? orders.length : null})
        </h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
        </div>
        {orders?.length > 0 ? (
          <div className="col-lg-12 col-12 col-md-12 	">
            <div className="alert alert-secondary d-flex flex-row" role="alert">
              Tổng hóa đơn: &nbsp;{" "}
              <p className="text-danger">{orders ? orders.length : null}</p>{" "}
              &nbsp; Tổng tiền: &nbsp;
              <p className="text-danger">
                {orders
                  ? orders
                      .reduce((total, od) => total + od.total_price, 0)
                      .toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                  : null}
              </p>{" "}
              &nbsp; Tổng nợ: &nbsp;
              <p className="text-danger">
                {orders
                  ? orders
                      .reduce((total, od) => total + od.debt_price, 0)
                      .toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })
                  : null}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default OrderMain;
