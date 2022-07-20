import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import RouteTable from "./RouteTable";
import { listRoutes } from "../../Redux/Actions/RouteAction.js";
import { Link } from "react-router-dom";

const MainRoutes = (props) => {
  const dispatch = useDispatch();

  const routeList = useSelector((state) => state.routeList);
  const { error, loading, routes } = routeList;

  useEffect(() => {
    dispatch(listRoutes());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Danh sách tuyến đường</h2>
        <div>
          <Link to="add_route" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo mới tuyến đường
          </Link>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Notes table */}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <RouteTable routes={routes} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainRoutes;
