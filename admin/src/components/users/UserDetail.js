import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Link } from "react-router-dom";

const UserDetail = (props) =>
{
  const { users } = props;
  const user = users.users;

  function formatStringID(cell)
  {
    return <span>{cell.substring(0, 8)}</span>;
  }

  const columns = [
    {
      dataField: "user_id",
      text: "Mã khách hàng",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập mã khách hàng",
      }),
      formatter: formatStringID,
      headerTitle: true,
      title: true,
    },
    {
      dataField: "fullname",
      text: "Tên",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập tên",
      }),
      headerTitle: true,
    },
    {
      dataField: "address",
      text: "Địa chỉ",
      sort: true,
      filter: textFilter({
        delay: 1000,
        placeholder: "Nhập địa chỉ",
      }),
      headerTitle: true,
    },
    {
      dataField: "phone",
      text: "Số điện thoại",
      sort: true, filter: textFilter({
        delay: 1000,
        placeholder: "Nhập số điện thoại",
      }),
      headerTitle: true,
    },
    {
      dataField: "user_id",
      text: "Chức năng",
      editable: false,
      formatter: (cellContent, row) =>
      {
        return (
          <div className="text-center">
            <Link
              to={{
                pathname: `/user/${row.user_id}`,
              }}
            >
              <i className="fas fa-eye"></i>
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
      <section className="content-main">
        <table className="table">
          {user?.length > 0 ? (
            <BootstrapTable
              bootstrap4
              keyField="id"
              columns={columns}
              data={user}
              pagination={pagination}
              filter={filterFactory()}
            />
          ) : (
            <div>
              <h5>Không tìm thấy bất kí khách hàng nào</h5>
            </div>
          )}
        </table>
      </section>
    </>
  );
};

export default UserDetail;
