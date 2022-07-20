import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrder } from "../../Redux/Actions/OrderActions";
import { ORDER_DELETE_RESET } from "../../Redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const Orders = (props) =>
{
  const { loading, error, orders } = props;

  const dispatch = useDispatch();
  const orderDelete = useSelector((state) => state.orderDelete);
  const { error: errorDelete, success: successDelete } = orderDelete;

  function dateFormatter(cell)
  {
    return <span>{moment(cell).format("DD/MM/YYYY")}</span>;
  }

  function formatStringID(cell)
  {
    return <span>{cell.substring(0, 8)}</span>;
  }
  function formatPrice(cell)
  {
    return (
      <span>
        {cell.toLocaleString("it-IT", {
          style: "currency",
          currency: "VND",
        })}
      </span>
    );
  }

  const columns = [
    {
      dataField: "order_id",
      text: "Mã hóa đơn",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập mã hóa đơn",
      }),
      formatter: formatStringID,
      headerTitle: true,
      title: true,
    },
    {
      dataField: "user.fullname",
      text: "Người đặt",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập người đặt",
      }),
      headerTitle: true,
    },
    {
      dataField: "status",
      text: "Tình trạng",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập tình trạng",
      }),
      headerTitle: true,
    },
    {
      dataField: "total_price",
      text: "Tổng tiền",
      sort: true,
      formatter: formatPrice,
      headerTitle: true,
    },
    {
      dataField: "debt_price",
      text: "Nợ",
      sort: true,
      formatter: formatPrice,
      headerTitle: true,
    },
    {
      dataField: "created_at",
      text: "Ngày đặt",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập ngày đặt",
      }),
      formatter: dateFormatter,
      headerTitle: true,
    },
    // {
    //   dataField: "updated_at",
    //   text: "Ngày sửa",
    //   sort: true,
    //   filter: textFilter({
    //     delay: 1000,
    //     placeholder: "Ngày sửa",
    //   }),
    //   headerTitle: true,
    //   formatter: dateFormatter,
    // },
    {
      dataField: "order_id",
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, row) =>
      {
        return (
          <div className="text-center">
            <Link
              to={{
                pathname: `/order/${row.order_id}`,
              }}
            >
              <i className="fas fa-eye"></i>
            </Link>
            &nbsp;&nbsp;
            <span onClick={() => deleteHandler(row.order_id)}>
              <i className="fa fa-trash text-danger"></i>
            </span>
            &nbsp;&nbsp;
          </div>
        );
      },
    },
  ];

  useEffect(() =>
  {
    if (successDelete)
    {
      toast.success("Xóa phiếu đặt hàng thành công", ToastObjects);
      dispatch({ type: ORDER_DELETE_RESET });
      window.location.reload();
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) =>
  {
    if (window.confirm("Bạn có chắc chắn muốn bỏ đơn hàng này?"))
    {
      dispatch(deleteOrder(id));
    }
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) =>
    {
      console.log("page", page);
    },
    onSizePerPageChange: (page, sizePerPage) =>
    {
      console.log("page", page);
    },
  });

  return (
    <>
      <Toast />
      <div className="card-body">
        {loading ? (
          <Loading />
        ) : error && errorDelete ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table">
              {orders.length > 0 ? (
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  columns={columns}
                  data={orders}
                  pagination={pagination}
                  filter={filterFactory()}
                />
              ) : (
                <div>
                  <h5>Không tìm thấy bất kí phiếu đặt hàng nào</h5>
                </div>
              )}
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
