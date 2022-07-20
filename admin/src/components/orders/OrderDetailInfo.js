import React from "react";

const OrderDetailInfo = (props) => {
  const { order } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      {order.order.map((item, index) => {
        return (
          <>
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-user"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Khách hàng</h6>
                  <p className="mb-1">
                    Tên khách hàng: {item.user.fullname} <br />
                    Số điện thoại: {item.user.phone} <br />
                  </p>
                </div>
              </article>
            </div>
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-truck-moving"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Thông tin đơn hàng</h6>
                  <p className="mb-1">
                    Địa chỉ khách hàng: {item.shipping_address} <br />
                    {item.Payment
                      ? `Phương thức thanh toán: ${item.payment.name}`
                      : null}
                  </p>
                </div>
              </article>
            </div>
            <div className="col-md-6 col-lg-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-map-marker-alt"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Vận chuyển</h6>
                  <p className="mb-1">
                    Địa chỉ nhận hàng: {item.shipping_address}
                  </p>
                </div>
              </article>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default OrderDetailInfo;
