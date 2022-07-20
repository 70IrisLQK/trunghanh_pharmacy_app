import React, { useEffect } from "react";
import UserDetailInfo from "./UserDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUserId } from "../../Redux/Actions/OrderActions";
import { getTransactionByUserId } from "../../Redux/Actions/TransactionActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";
import UserDetailOrder from "./UserDetailOrder";

const UserDetailMain = (props) =>
{
  const { userId } = props;
  const dispatch = useDispatch();

  const users = useSelector((state) => state.orderByUserID);
  const transaction = useSelector((state) => state.transactionByUserID);
  const { loading, error } = users;
  const {
    loading: loadingTransaction,
    error: errorTransaction,
    transactions,
  } = transaction;
  const orders = users.order;

  useEffect(() =>
  {
    dispatch(getOrderByUserId(userId));
    dispatch(getTransactionByUserId(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <Link to="/users" className="btn btn-dark text-white">
            Quay lại
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <UserDetailInfo orders={orders} loading={loading} />
          </div>
        </div>
        {loading && loadingTransaction ? (
          <Loading />
        ) : error && errorTransaction ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="card">
              <div className="card-body">
                <div className="row mb-5 order-info-wrap">
                  <div className="col-md-6 col-lg-4">
                    <article className="icontext align-items-start">
                      <span className="icon icon-sm rounded-circle alert-primary">
                        <i className="text-primary fas fa-usd-circle"></i>
                      </span>
                      <div className="text">
                        <h4 className="mb-1 text-primary">
                          {orders
                            ? orders
                              .reduce(
                                (total, od) => total + od.total_price,
                                0
                              )
                              .toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })
                            : null}
                        </h4>
                        <p className="mb-1">Tổng doanh thu</p>
                      </div>
                    </article>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <article className="icontext align-items-start">
                      <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fa fa-exchange"></i>
                      </span>
                      <div className="text">
                        <h4 className="mb-1 text-success">
                          {transactions ? transactions.length : 0}
                        </h4>
                        <p className="mb-1">
                          Số lần giao dịch
                          <br />
                        </p>
                      </div>
                    </article>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <article className="icontext align-items-start">
                      <span className="icon icon-sm rounded-circle alert-danger">
                        <i className="text-danger fas fa-money-bill"></i>
                      </span>
                      <div className="text">
                        <h4 className="mb-1 text-danger">
                          {orders
                            ? orders
                              .reduce((total, od) => total + od.debt_price, 0)
                              .toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })
                            : null}
                        </h4>
                        <p className="mb-1">Còn nợ</p>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <UserDetailOrder users={users} loading={loading} />
                  </div>
                </div>
                <div className="row"></div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default UserDetailMain;
