import React from "react";

const UserDetailInfo = (props) =>
{
  const { orders, loading } = props;
  return (
    <>
      <div className="row mb-5 order-info-wrap">
        {loading ? (
          <div></div>
        ) : orders.length > 0 ? (
          <>
            <div className="col-md-12 col-lg-12 d-flex flex-row ">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-user"></i>
              </span>
              <h4 className="mb-1 text-primary">Thông tin khách hàng</h4>
            </div>
            <div className="col-md-6 col-lg-6">
              <article className="icontext align-items-start">
                <div className="text">
                  <p className="mb-1">
                    <b>Tên khách hàng:</b> {orders[0].user.fullname} <br />
                    <br />
                    <b>Điện thoại:</b> {orders[0].user.phone} <br />
                    <br />
                    <b>Địa chỉ:</b> {orders[0].user.address} <br />
                    <br />
                  </p>
                </div>
              </article>
            </div>
            <div className="col-md-6 col-lg-6">
              <article className="icontext align-items-start">
                <div className="text">
                  <p className="mb-1">
                    <b>Mã khách hàng:</b> KH{orders[0].user_id.substring(0, 8)}{" "}
                    <br />
                    <br />
                    <b>Email:</b>{" "}
                    {orders[0].user ? orders[0].user.email : "(Chưa có)"} <br />
                  </p>
                </div>
              </article>
            </div>
          </>
        ) : (
          <div>
            <h1>Không có thông tin nào</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetailInfo;
