import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import OrderDetail from "../models/orderDetail.js";
import Payment from "../models/payment.js";
import { or, Sequelize } from "sequelize";
import moment from "moment";
import Transaction from "../models/transaction.js";

const TIMER = moment().format("YYYY-MM-DD, hh:mm:ss");

const OrderController = {
  placeOrder: async (req, res) =>
  {
    try
    {
      const {
        user_id,
        phone,
        address,
        total,
        orderItems,
        payment_id,
        debt,
        paid,
        quantity,
        ck,
      } = req.body;
      await User.findOne({ where: { user_id: user_id } })
        .then((user) =>
        {
          if (user)
          {
            Order.create({
              total_price: total,
              shipping_address: address,
              phone: phone,
              user_id: user_id,
              payment_id: payment_id,
              paid_price: paid,
              debt_price: debt,
              created_at: TIMER,
              quantity: quantity,
              discount_price: ck,
              status: "Chờ xác nhận",
            })
              .then((orders) =>
              {
                let i = 0;
                let length = orderItems.length;
                let cartITems = [];
                while (i < length)
                {
                  cartITems.push({
                    order_id: orders.order_id,
                    product_id: orderItems[i].id,
                    name: orderItems[i].itemName,
                    quantity: orderItems[i].itemQuantity,
                    price: orderItems[i].itemPrice,
                    total: orderItems[i].itemTotal,
                    image: orderItems[i].itemImage,
                    unit: orderItems[i].itemUnit,
                    created_at: TIMER,
                  });
                  i++;
                }
                Transaction.create({
                  order_id: orders.order_id,
                  paid_price: paid,
                  created_at: TIMER,
                  payment_id: payment_id,
                  user_id: user_id,
                });
                return OrderDetail.bulkCreate(cartITems)
                  .then((orderDetail) =>
                  {
                    return res.status(200).json({
                      status: "success",
                    });
                  })
                  .catch((error) =>
                  {
                    return res.status(500).json({ msg: error.message });
                  });
              })
              .catch((error) =>
              {
                return res.status(500).json({ msg: error.message });
              });
          }
        })
        .catch((error) =>
        {
          return res.status(500).json({ msg: error.message });
        });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  placeOrderSales: async (req, res) =>
  {
    try
    {
      const {
        user_id,
        phone,
        address,
        total,
        orderItems,
        pharmacy_id,
        discount_price,
        quantity,
      } = req.body;
      await User.findOne({ where: { user_id: user_id } })
        .then((user) =>
        {
          if (pharmacy_id)
          {
            if (user)
            {
              Order.create({
                shipping_address: address,
                phone: phone,
                user_id: user_id,
                pharmacy_id: pharmacy_id,
                discount_price: discount_price,
                created_at: moment().format("YYYY/MM/DD, hh:mm:ss"),
                debt_price: total,
                quantity: quantity,
                status: "Chờ xác nhận",
                created_at: TIMER,
                total_price: total,
              })
                .then((orders) =>
                {
                  let i = 0;
                  let length = orderItems.length;
                  let cartITems = [];
                  while (i < length)
                  {
                    cartITems.push({
                      order_id: orders.order_id,
                      product_id: orderItems[i].id,
                      name: orderItems[i].itemName,
                      quantity: orderItems[i].itemQuantity,
                      price: orderItems[i].itemPrice,
                      total: orderItems[i].itemTotal,
                      image: orderItems[i].itemImage,
                      unit: orderItems[i].itemUnit,
                      created_at: TIMER,
                    });
                    i++;
                  }
                  Transaction.create({
                    order_id: orders.order_id,
                    created_at: TIMER,
                    paid_price: 0,
                    user_id: user_id,
                  });
                  return OrderDetail.bulkCreate(cartITems)
                    .then((orderDetail) =>
                    {
                      return res.status(200).json({
                        status: "success",
                      });
                    })
                    .catch((error) =>
                    {
                      return res.status(500).json({ msg: error.message });
                    });
                })
                .catch((error) =>
                {
                  console.log(error.message);
                  return res.status(500).json({ msg: error.message });
                });
            }
          }
        })
        .catch((error) =>
        {
          console.log(error.message);
          return res.status(500).json({ msg: error.message });
        });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOrderDetail: async (req, res) =>
  {
    const id = req.params.id;

    try
    {
      const orderDetails = await OrderDetail.findAll({
        where: { order_id: id },
        order: [["created_at", "DESC"]],
        include: [{ model: Product }, { model: Order }],
      });

      if (!orderDetails)
      {
        return res.status(400).json({
          success: false,
          msg: "Some error occurred while retrieving order details",
        });
      }

      res.status(200).json({ orderDetails: orderDetails, status: "Success" });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllOrder: async (req, res) =>
  {
    try
    {
      const orders = await Order.findAll({
        order: [["created_at", "DESC"]],
        include: [{ model: User }],
      });

      if (!orders)
      {
        return res.status(400).json({
          success: false,
          msg: "Some error occurred while retrieving orders",
        });
      }

      res.status(200).json({ orders: orders, success: "OK" });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllOrderStatusCount: async (req, res) =>
  {
    try
    {
      const orders = await Order.findAll({
        attributes: [
          "status",
          [Sequelize.fn("COUNT", Sequelize.col("status")), "total"],
        ],
        group: ["status"],
      });

      if (!orders)
      {
        return res.status(400).json({
          success: false,
          msg: "Some error occurred while retrieving order status count",
        });
      }

      res.status(200).json({ orders: orders, success: "OK" });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  getOrderStatus: async (req, res) =>
  {
    const status = req.query.status;
    try
    {
      const orders = await Order.findAll({
        where: { status: status },
        order: [["created_at", "DESC"]],
      });

      if (!orders)
      {
        return res.status(400).json({
          success: false,
          msg: "Some error occurred while retrieving order status",
        });
      }

      res.status(200).json({ orders: orders, success: "OK" });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  getOrderById: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const orders = await Order.findAll({
        where: { user_id: id },
        order: [["date_ordered", "DESC"]],
        include: [{ model: User }, { model: Payment }],
      });
      if (!orders)
      {
        return res
          .status(400)
          .json({ msg: "The order with given ID was not found" });
      }

      return res.status(200).json({
        msg: "Get all order by user id",
        status: "Success",
        orders: orders,
      });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  getOrderByOrderId: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const orders = await Order.findAll({
        where: { order_id: id },
        order: [["date_ordered", "DESC"]],
        include: [{ model: User }, { model: Payment }],
      });
      if (!orders)
      {
        return res
          .status(400)
          .json({ msg: "The order with given ID was not found" });
      }

      return res.status(200).json({
        msg: "Get all order by user id",
        status: "Success",
        orders: orders,
      });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateOrder: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      await Order.update(req.body, {
        where: { order_id: id },
      })
        .then((num) =>
        {
          if (num == 1)
          {
            res.send({
              message: "Orders status was updated successfully.",
            });
          } else
          {
            res.send({
              message: `Cannot update Tutorial with order_id=${id}. Maybe Order was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) =>
        {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id,
          });
        });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateAccountantOrder: async (req, res) =>
  {
    const id = req.params.id;
    const { paid } = req.body
    try
    {
      const orders = await Order.update(req.body, {
        where: { order_id: id },
      })
        .then((num) =>
        {
          if (num == 1)
          {
            Transaction.create({
              order_id: id,
              paid_price: paid,
              created_at: TIMER,
              payment_id: 'cb888d36-40ec-4cbd-a60e-707de4326d30',
            });
            res.send({
              message: "Orders status was updated successfully.",
            });
          } else
          {
            res.send({
              message: `Cannot update Tutorial with order_id=${id}. Maybe Order was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) =>
        {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id,
          });
        });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteOrder: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const orderDetails = await OrderDetail.destroy({
        where: { order_id: id },
      });

      if (!orderDetails)
      {
        return res.status(400).json({ msg: error.message });
      } else
      {
        const orders = await Order.destroy({
          where: { order_id: id },
        });
        if (!orders)
        {
          return res.status(400).json({ msg: error.message });
        }
        res.status(200).json({ msg: "Delete success!", status: "success" });
      }
    } catch (error)
    {
      console.log(error.message);
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default OrderController;
