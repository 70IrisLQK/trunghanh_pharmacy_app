import Transaction from "../models/transaction.js";
import Order from "../models/order.js";
import Payment from "../models/payment.js";
import User from "../models/user.js";

const TransactionController = {
  getAllTransaction: async (req, res) =>
  {
    try
    {
      const transactions = await Transaction.findAll({
        order: [["created_at", "DESC"]],
        include: [{ model: Order }, { model: Payment }],
      });

      if (!transactions)
      {
        return res
          .status(400)
          .json({ msg: "Some error occurred while retrieving transactions" });
      }

      res.status(200).json({ status: "success", transactions: transactions });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  getTransactionByOrderId: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const transactions = await Transaction.findAll({
        where: { order_id: id },
        include: [{ model: Order }, { model: Payment }],
        order: [["created_at", "DESC"]],
      });

      if (!transactions)
      {
        return res.status(400).json({
          msg: "Some error occurred while retrieving transactions by TransactionID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", transactions: transactions });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },

  getTransactionByUserId: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const transactions = await Transaction.findAll({
        where: { user_id: id },
        include: [{ model: Order }, { model: Payment }, { model: User }],
        order: [["created_at", "DESC"]],
      });

      if (!transactions)
      {
        return res.status(400).json({
          msg: "Some error occurred while retrieving transactions by TransactionID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", transactions: transactions });
    } catch (error)
    {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default TransactionController;
