import Pharmacy from "../models/pharmacy.js";
import Route from "../models/route.js";
import User from "../models/user.js";
import moment from "moment";
import { Sequelize } from "sequelize";

const RouteController = {
  getAllRoute: async (req, res) =>
  {
    try
    {
      const routes = await Route.findAll({
        order: [["created_at", "DESC"]],
        include: [{ model: Pharmacy }, { model: User }],
      });

      if (!routes)
      {
        return res
          .status(400)
          .json({ message: "Some error occurred while retrieving routes" });
      }

      res.status(200).json({ status: "success", routes: routes });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },
  getRouteById: async (req, res) =>
  {
    const where = {};
    const { user } = req.query;
    const currentDate = moment().format('dddd')
    where.week_date = { [Sequelize.Op.eq]: currentDate };

    if (user)
    {
      where.user_id = { [Sequelize.Op.like]: `%${user}%` };
    }
    try
    {
      const routes = await Route.findAll({
        where,
        include: [{ model: Pharmacy }, { model: User }],
      });

      if (!routes)
      {
        return res.status(400).json({
          message: "Some error occurred while retrieving routes by RouteID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", routes: routes });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },

  getRouteStatus: async (req, res) =>
  {
    const where = {};
    const { user, pharmacy } = req.query;

    const currentDate = moment().format('dddd')
    where.week_date = { [Sequelize.Op.eq]: currentDate };

    if (user)
    {
      where.user_id = { [Sequelize.Op.like]: `%${user}%` };
    }
    if (pharmacy)
    {
      where.pharmacy_id = { [Sequelize.Op.like]: `%${pharmacy}%` };
    }
    try
    {
      const routes = await Route.findAll({
        where,
        include: [{ model: Pharmacy }, { model: User }],
      });

      if (!routes)
      {
        return res.status(400).json({
          message: "Some error occurred while retrieving routes",
        });
      }

      res.status(200).json({ status: "success", routes: routes });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },

  getRouteByRouteId: async (req, res) =>
  {
    const id = req.params.id;
    try
    {
      const routes = await Route.findAll({
        where: { route_id: id },
        include: [{ model: Pharmacy }, { model: User }],
      });

      if (!routes)
      {
        return res.status(400).json({
          message: "Some error occurred while retrieving routes by RouteID = ",
          id,
        });
      }

      res.status(200).json({ status: "success", routes: routes });
    } catch (error)
    {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default RouteController;
