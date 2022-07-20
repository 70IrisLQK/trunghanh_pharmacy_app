import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteRoute } from "../../Redux/Actions/RouteAction.js";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const RouteTable = (props) => {
  const { routes } = props;
  const dispatch = useDispatch();
  const [route, setRoute] = useState(routes);
  const routeDelete = useSelector((state) => state.routeDelete);
  const { error: errorDelete, success: successDelete } = routeDelete;

  const columns = [
    {
      dataField: "route_id",
      text: "Mã tuyến đường",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "route_name",
      text: "Tên tuyến đường",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "user.fullname",
      text: "Người bán hàng",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "pharmacy.CUSTOMER_NAME",
      text: "Nhà thuốc",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "week_date",
      text: "Ngày trong tuần",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "created_at",
      text: "Ngày tạo",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "updated_at",
      text: "Ngày sửa",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "status",
      text: "Trạng thái",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "route_id",
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, row) => {
        return (
          <div className="text-center">
            <span onClick={() => deleteHandler(row.route_id)}>
              <i className="fa fa-trash text-danger"></i>
            </span>
            &nbsp;&nbsp;
            <Link
              to={{
                pathname: `/edit_route/${row.route_id}`,
              }}
            >
              <i className="fas fa-edit text-success"></i>
            </Link>
          </div>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => {
      console.log("page", page);
    },
    onSizePerPageChange: (page, sizePerPage) => {
      console.log("page", page);
    },
  });

  useEffect(() => {
    if (successDelete) {
      toast.success("Xóa ghi chú thành công", ToastObjects);
      window.location.reload();
    }
  }, [route, dispatch, successDelete]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm("Are you sure??")) {
      dispatch(deleteRoute(id));
    }
  };

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-12">
        <table className="table">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          <tbody>
            {route.length > 0 ? (
              <BootstrapTable
                bootstrap4
                keyField="id"
                columns={columns}
                data={route}
                pagination={pagination}
                filter={filterFactory()}
              />
            ) : (
              <div>
                <h3>Không tìm thấy bất kì ghi chú nào</h3>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RouteTable;
