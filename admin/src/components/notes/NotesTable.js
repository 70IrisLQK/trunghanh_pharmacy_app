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
import { deleteNote } from "../../Redux/Actions/NoteActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const NotesTable = (props) =>
{
  const { notes } = props;
  const dispatch = useDispatch();
  const noteDelete = useSelector((state) => state.noteDelete);
  const { error: errorDelete, success: successDelete, loading: loadingDelete } = noteDelete;
  function dateFormatter(cell)
  {
    return <span>{moment(cell).format("DD/MM/YYYY")}</span>;
  }

  function formatStringID(cell)
  {
    return <span>{cell.substring(0, 8)}</span>;
  }

  const columns = [
    {
      dataField: "note_id",
      text: "Mã ghi chú",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập mã ghi chú",
      }),
      formatter: formatStringID,
      headerTitle: true,
      title: true,
    },
    {
      dataField: "pharmacy.CUSTOMER_NAME",
      text: "Nhà thuốc",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập nhà thuốc",
      }),
      headerTitle: true,
    },
    {
      dataField: "description",
      text: "Mô tả",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập mô tả",
      }),
      headerTitle: true,
    },
    {
      dataField: "reply_note",
      text: "Phản hồi",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập phản hồi",
      }),
      headerTitle: true,
    },

    {
      dataField: "user.fullname",
      text: "Người tạo",
      sort: true,
      headerTitle: true,
    },
    {
      dataField: "created_at",
      text: "Ngày tạo",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập ngày tạo",
      }),
      formatter: dateFormatter,
      headerTitle: true,
    },
    {
      dataField: "note_id",
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, row) =>
      {
        return (
          <div className="text-center">
            <Link
              to={{
                pathname: `/edit_note/${row.note_id}`,
              }}
            >
              <i className="fas fa-edit"></i>
            </Link>
            &nbsp;&nbsp;
            <span onClick={() => deleteHandler(row.note_id)}>
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
      toast.success("Xóa ghi chú thành công", ToastObjects);
      window.location.reload();
    }
  }, [notes, dispatch, successDelete]);

  const deleteHandler = (id) =>
  {
    if (window.confirm("Bạn có muốn xoá không?"))
    {
      dispatch(deleteNote(id));
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
        {loadingDelete ? (
          <Loading />
        ) : errorDelete ? (
          <Message variant="alert-danger">{errorDelete}</Message>
        ) : (
          <div className="table-responsive">
            <table className="table">
              {notes.length > 0 ? (
                <BootstrapTable
                  bootstrap4
                  keyField="id"
                  columns={columns}
                  data={notes}
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

export default NotesTable;
