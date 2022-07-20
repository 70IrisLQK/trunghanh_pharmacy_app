import moment from "moment";
import CheckIn from "../models/checkin.js";
import Order from "../models/order.js";
import OrderDetail from "../models/orderdetail.js";
import Route from "../models/route.js";
import Transaction from "../models/transaction.js";
import { uploadToCloudinary } from "../utils/UploadImage.js";

const TIMER = moment().format('YYYY/MM/DD, hh:mm:ss')

const CheckInController = {
  checkIn: async (req, res) =>
  {
    const {
      user_id,
      pharmacy_id,
      phone,
      address,
      total,
      orderItems,
      timer,
      status,
      discount_price,
    } = req.body;

    var file = req.files;
    console.log(file)
    let i = 0;
    let fileNames = [];
    while (i < file.length)
    {
      var localFilePath = req.files[i].path;

      var result = await uploadToCloudinary(localFilePath);
      fileNames.push(result.url);

      i++;
    }

    try
    {
      if (status === "Đóng cửa" && file)
      {
        CheckIn.create({
          image: fileNames,
          location: address,
          user_id: user_id,
          duration: 0,
          created_at: TIMER,
        })
          .then((check_in) =>
          {
            if (check_in)
            {
              Route.update(
                {
                  status: 'Đã hoàn thành',
                  updated_at: TIMER,
                },
                { where: { user_id: user_id, pharmacy_id: pharmacy_id } }
              )
              return res.status(200).json({
                status: "success",
              });
            }
          })
          .catch((error) =>
          {
            console.log(error.message);
            return res.status(500).json({
              message: error.message,
            });
          });
      } else if (status === "Mở cửa" && orderItems && timer)
      {
        let duration = timer / 1000;

        CheckIn.create({
          location: address,
          user_id: user_id,
          duration: duration,
          image: fileNames,
          status: status,
          created_at: TIMER,
        })
          .then((check_in) =>
          {
            Route.update(
              {
                status: 'Đã hoàn thành',
                updated_at: TIMER,
              },
              { where: { user_id: user_id, pharmacy_id: pharmacy_id } }
            )
            Order.create({
              debt_price: total,
              shipping_address: address,
              phone: phone,
              user_id: user_id,
              discount_price: discount_price,
              pharmacy_id: pharmacy_id,
              created_at: TIMER,
              total_price: total,
              status: 'Chờ xác nhận'
            })
              .then((orders) =>
              {
                Transaction.create({
                  order_id: orders.order_id,
                  created_at: TIMER,
                  paid_price: 0,
                  user_id: user_id
                });
                const parseOrderItems = JSON.parse(orderItems);

                let i = 0;
                let cartITems = [];
                while (i < parseOrderItems.length)
                {
                  cartITems.push({
                    order_id: orders.order_id,
                    product_id: parseOrderItems[i].id,
                    name: parseOrderItems[i].itemName,
                    quantity: parseOrderItems[i].itemQuantity,
                    price: parseOrderItems[i].itemPrice,
                    total: parseOrderItems[i].itemTotal,
                    image: parseOrderItems[i].itemImage,
                    unit: parseOrderItems[i].itemUnit,
                    created_at: moment().format('YYYY/MM/DDm hh:mm:ss')
                  });
                  i++;
                }
                return OrderDetail.bulkCreate(cartITems)
                  .then((orderDetail) =>
                  {
                    return res.status(200).json({
                      status: "success",
                    });
                  })
                  .catch((error) =>
                  {
                    console.log(error.message);
                    return res.status(500).json({ message: error.message });
                  });
              })
              .catch((error) =>
              {
                console.log(error.message);
                return res.status(500).json({ message: error.message });
              });
          })
          .catch((error) =>
          {
            console.log(error.message);
            return res.status(500).json({ message: error.message });
          });
      } else if (status === "Mở cửa" && file)
      {
        let duration = timer / 1000;
        CheckIn.create({
          image: fileNames,
          location: address,
          user_id: user_id,
          duration: duration,
          status: status,
          created_at: moment().format("YYYY/MM/DD, hh:mm:ss"),
        })
          .then((check_in) =>
          {
            if (check_in)
            {
              Route.update(
                {
                  status: 'Đã hoàn thành',
                  updated_at: moment().format("YYYY-MM-DD, hh:mm:ss"),
                },
                { where: { user_id: user_id, pharmacy_id: pharmacy_id } }
              )
              return res.status(200).json({
                status: "success",
              });
            }
          })
          .catch((error) =>
          {
            console.log(error.message);
            return res.status(500).json({
              message: error.message,
            });
          });
      } else
      {
        console.log(error.message);
        return res.status(400).json({ message: error.message });
      }
    } catch (error)
    {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  },
};

export default CheckInController;
