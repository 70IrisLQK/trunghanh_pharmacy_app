import React from "react";
import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2";

const SaleStatistics = (props) =>
{
  const { orders } = props;

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const date = new Date();
  const lineState = {
    labels: months,
    datasets: [
      {
        label: `Doanh số trong ${date.getFullYear() - 2}`,
        borderColor: "#8A39E1",
        backgroundColor: "#8A39E1",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.created_at).getMonth() === i &&
                new Date(od.created_at).getFullYear() === date.getFullYear() - 2
                && od.status === 'Đã giao'
            )
            .reduce((total, od) => total + od.paid_price, 0)
        ),
      },
      {
        label: `Doanh số  ${date.getFullYear() - 1}`,
        borderColor: "orange",
        backgroundColor: "orange",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.created_at).getMonth() === i &&
                new Date(od.created_at).getFullYear() === date.getFullYear() - 1
                && od.status === 'Đã giao'
            )
            .reduce((total, od) => total + od.paid_price, 0)
        ),
      },
      {
        label: `Doanh số ${date.getFullYear()}`,
        borderColor: "#4ade80",
        backgroundColor: "#4ade80",
        data: months.map((m, i) =>
          orders
            ?.filter(
              (od) =>
                new Date(od.created_at).getMonth() === i &&
                new Date(od.created_at).getFullYear() === date.getFullYear()
                && od.status === 'Đã giao'
            )
            .reduce((total, od) => total + od.paid_price, 0)
        ),
      },
    ],
  };

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">
            Biểu đồ thống kê doanh số bán hàng theo năm
          </h5>
          <Line data={lineState} />
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
