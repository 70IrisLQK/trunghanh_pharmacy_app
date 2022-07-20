import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/UserActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import UserDetail from "./UserDetail";

const UserComponent = () =>
{
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const { loading, error, users } = userList;
  useEffect(() =>
  {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Khách hàng</h2>
        {/* <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div> */}
      </div>

      <div className="card mb-4">
        <header className="card-header">
        </header>
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <UserDetail orders={orders} loading={loading} users={users} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
