import React from "react";

const TopTotal = (props) =>
{
  const { orders, products } = props;
  let totalSale = 0;
  let totalDebt = 0;
  if (orders)
  {
    orders.map((order) =>
      order.status === "Đã giao"
        ? (totalSale = totalSale + order.paid_price)
        : null
    );
  }
  if (orders)
  {
    orders.map((order) => (totalDebt = totalDebt + order.debt_price));
  }
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Doanh số</h6>{" "}
              <span>
                {totalSale.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Số đơn hàng</h6>
              {orders ? <span>{orders.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-danger">
              <i className="text-danger fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Nợ</h6>
              {orders ? (
                <span>
                  {totalDebt.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Số sản phẩm</h6>
              {products ? <span>{products.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
