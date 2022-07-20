import User from "../models/user.js";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Helper from "../utils/Helper.js";
import jwt from "jsonwebtoken";
import moment from "moment";

dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_SECRET_KEY;

const AuthController = {
  getUserById: async (req, res) =>
  {
    try
    {
      Helper.checkPermission(req.user.role_id, "user_get")
        .then((rolePerm) =>
        {
          User.findByPk(req.params.id)
            .then((user) => res.status(200).json({ user }))
            .catch((error) =>
            {
              res.status(400).json({ message: error.message });
            });
        })
        .catch((error) =>
        {
          return res.status(403).json({ message: error.message });
        });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) =>
  {
    const { fullname, phone, email, address } = req.body;
    const id = req.params.id;

    try
    {
      User.update(
        {
          fullname: fullname,
          phone: phone,
          email: email,
          address: address,
          updated_at: moment().format("YYYY/MM/DD, hh:mm:ss"),
        },
        { where: { user_id: id } }
      )
        .then((num) =>
        {
          if (num == 1)
          {
            res.status(200).json({
              message: "User was updated successfully.",
              status: "success",
            });
          } else
          {
            res.status(400).json({
              message: `Cannot update User with id=${user_id}. Maybe User was not found or req.body is empty!`,
            });
          }
        })
        .catch((err) =>
        {
          res.status(500).send({
            message: "Error updating User with id=" + id,
          });
        });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },
  // User Login
  login: async (req, res) =>
  {
    const { username, password } = req.body;
    try
    {
      User.findOne({
        where: {
          username: username,
          password: password,
        },
      })
        .then((user) =>
        {
          if (!user)
          {
            return res.status(400).json({
              message:
                "Quá trình xác thực đã thất bại. Tên người dùng hoặc mật khẩu sai.",
            });
          }
          const token = jwt.sign({ id: user.user_id }, ACCESS_TOKEN, {
            expiresIn: 10000000,
          });
          return res.status(200).json({ user, token, status: "success" });
        })
        .catch((error) =>
        {
          return res.status(400).json({ message: error.message });
        });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },

  register: async (req, res) =>
  {
    const { username, password, fullname, phone, role_id } = req.body;

    try
    {
      if (!role_id || !username || !password || !fullname || !phone)
      {
        res.status(400).send({
          message:
            "Please pass Role ID, username, password, phone or fullname.",
        });
      } else
      {
        const user = await User.findOne({ where: { username: username } });

        if (!user)
        {
          User.create({
            username: username,
            password: password,
            full_name: fullname,
            phone: phone,
            role_id: role_id,
          })
            .then((user) =>
            {
              const token = jwt.sign({ username }, ACCESS_TOKEN, {
                expiresIn: 10000000,
              });

              return res.status(201).json({ user, token });
            })
            .catch((error) =>
            {
              console.log(error);
              return res.status(400).json({ message: error.message });
            });
        } else
        {
          return res.status(400).json({ message: "Username is already exist" });
        }
      }
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },

  getAllUserPharmacy: async (req, res) =>
  {
    try
    {
      const users = await User.findAll({
        where: {
          pharmacy_id: {
            [Sequelize.Op.ne]: "",
          },
        },
      });
      if (!users)
      {
        return status(400).json({ message: "No users found" });
      }
      res
        .status(200)
        .json({ message: "Get all user", users: users, status: "success" });
    } catch (error)
    {
      res.status(500).json({ message: error.message });
    }
  },

  getAllUserSales: async (req, res) =>
  {
    try
    {
      const users = await User.findAll({
        where: {
          role_id: {
            [Sequelize.Op.eq]: "A54FA54C-04A8-4C56-9993-1ECC797DA1A4",
          },
        },
      });
      if (!users)
      {
        return status(400).json({ message: "No users found" });
      }
      res
        .status(200)
        .json({ message: "Get all user", users: users, status: "success" });
    } catch (error)
    {
      res.status(500).json({ message: error.message });
    }
  },
};

export default AuthController;
