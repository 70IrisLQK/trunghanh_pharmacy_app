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
import { deleteNoteType } from "../../Redux/Actions/NoteTypeActions";
import Message from "../LoadingError/Error";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const NoteTypeTable = (props) => {
  const { note_types } = props;
  const dispatch = useDispatch();
  const [noteTypes] = useState(note_types);
  const noteTypeDelete = useSelector((state) => state.noteTypeDelete);
  const { error: errorDelete, success: successDelete } = noteTypeDelete;

  useEffect(() => {
    if (successDelete) {
      toast.success("Xóa ghi chú thành công", ToastObjects);
      window.location.reload();
    }
  }, [noteTypes, dispatch, successDelete]);

  function formatStringID(cell) {
    return <span>{cell.substring(0, 8)}</span>;
  }

  const columns = [
    {
      dataField: "note_type_id",
      text: "Mã loại ghi chú",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập mã loại ghi chú",
      }),
      formatter: formatStringID,
      headerTitle: true,
      title: true,
    },
    {
      dataField: "name",
      text: "Tên",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập tên",
      }),
      headerTitle: true,
    },
    {
      dataField: "description",
      text: "Mô tả",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập địa chỉ",
      }),
      headerTitle: true,
    },

    {
      dataField: "note_type_id",
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, row) => {
        return (
          <div className="text-center">
            <Link
              to={{
                pathname: `/edit_notetype/${row.note_type_id}`,
              }}
            >
              <i className="fas fa-edit"></i>
            </Link>
            &nbsp;&nbsp;
            <span onClick={() => deleteHandler(row.note_type_id)}>
              <i className="fa fa-trash text-danger"></i>
            </span>
            &nbsp;&nbsp;
          </div>
        );
      },
    },
  ];

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteNoteType(id));
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
    onPageChange: (page, sizePerPage) => {
      console.log("page", page);
    },
    onSizePerPageChange: (page, sizePerPage) => {
      console.log("page", page);
    },
  });

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-12">
        <table className="table">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          <tbody>
            {noteTypes.length > 0 ? (
              <BootstrapTable
                bootstrap4
                keyField="id"
                columns={columns}
                data={noteTypes}
                pagination={pagination}
                filter={filterFactory()}
              />
            ) : (
              <div>
                <h5>Không tìm thấy bất kí ghi chú nào</h5>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NoteTypeTable;
