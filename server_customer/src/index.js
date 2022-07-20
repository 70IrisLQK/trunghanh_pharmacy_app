import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { LOGGER } from "./logs/index.js";
import database from "./config/DatabaseConfig.js";
import route from "./routes/index.js";
import Product from "./models/product.js";
import Category from "./models/category.js";
import Unit from "./models/unit.js";
import User from "./models/user.js";
import Role from "./models/role.js";
import Permission from "./models/permission.js";
import { AuthPassport } from "./config/Passport.js";
import OrderDetail from "./models/orderDetail.js";
import Order from "./models/order.js";
import Payment from "./models/payment.js";
import Note from "./models/note.js";
import NoteType from "./models/notetype.js";
import Pharmacy from "./models/pharmacy.js";
import CheckIn from "./models/checkin.js";
import Route from "./models/route.js";
import Transaction from "./models/transaction.js";
import cloudinary from "cloudinary";
import { createServer } from "http";
import { Server } from "socket.io";

AuthPassport(passport);

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"] }));

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Route Api
app.use("/api", route.ProductRoute);
app.use("/api", route.CategoryRoute);
app.use("/api", route.AuthRoute);
app.use("/api", route.OrderRoute);
app.use("/api", route.PaymentRoute);
app.use("/api", route.NoteRoute);
app.use("/api", route.NoteTypeRoute);
app.use("/api", route.PharmacyRoute);
app.use("/api", route.Route);
app.use("/api", route.TransactionRoute);
app.use("/api", route.CheckInRoute);

// Socket io
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const markers = []
io.on("connection", (socket) =>
{

  for (let i = 0; i < markers.length; i++)
  {
    const dataMarkers = new Map();
    for (const obj of markers)
    {
      dataMarkers.set(obj.id, obj);
    }

    const unique = [...dataMarkers.values()];

    socket.emit("markers", unique[i]);
  }
  socket.on("marker", data =>
  {
    markers.push(data);

    socket.emit("markers", data);
  });

  // for (let i = 0; i < markers.length; i++)
  // {
  //   const unique = markers
  //     .map(e => e['id'])
  //     .map((e, i, final) => final.indexOf(e) === i && i)
  //     .filter(obj => markers[obj])
  //     .map(e => markers[e]);
  //   console.log(unique)
  //   socket.emit("marker", unique[i]);
  // }

  // socket.on("position", position =>
  // {
  //   markers.push(position);
  //   console.log(position)
  //   socket.emit("marker", position);
  // });

  // const unique = markers
  //   .map(e => e['id'])
  //   .map((e, i, final) => final.indexOf(e) === i && i)
  //   .filter(obj => markers[obj])
  //   .map(e => markers[e]);

  socket.on("disconnect", () =>
  {
    console.log("Client disconnected");
  });
});

app.set("port", process.env.PORT);

// Connect database
database
  .sync()
  .then(() =>
  {
    Product.hasMany(OrderDetail, { foreignKey: "product_id" });
    OrderDetail.belongsTo(Product, { foreignKey: "product_id" });

    Order.hasMany(Transaction, { foreignKey: "order_id" });
    Transaction.belongsTo(Order, { foreignKey: "order_id" });

    Payment.hasMany(Transaction, { foreignKey: "payment_id" });
    Transaction.belongsTo(Payment, { foreignKey: "payment_id" });

    User.hasMany(Transaction, { foreignKey: "user_id" });
    Transaction.belongsTo(User, { foreignKey: "user_id" });

    User.hasMany(CheckIn, { foreignKey: "user_id" });
    CheckIn.belongsTo(User, { foreignKey: "user_id" });

    User.hasMany(Route, { foreignKey: "user_id" });
    Route.belongsTo(User, { foreignKey: "user_id" });

    Pharmacy.hasMany(Route, { foreignKey: "pharmacy_id" });
    Route.belongsTo(Pharmacy, { foreignKey: "pharmacy_id" });

    User.hasMany(Note, { foreignKey: "user_id" });
    Note.belongsTo(User, { foreignKey: "user_id" });

    Pharmacy.hasMany(Note, { foreignKey: "pharmacy_id" });
    Note.belongsTo(Pharmacy, { foreignKey: "pharmacy_id" });

    NoteType.hasMany(Note, { foreignKey: "note_type_id" });
    Note.belongsTo(NoteType, { foreignKey: "note_type_id" });

    Order.hasMany(OrderDetail, { foreignKey: "order_id" });
    OrderDetail.belongsTo(Order, { foreignKey: "order_id" });

    Category.hasMany(Product, { foreignKey: "category_id" });
    Product.belongsTo(Category, { foreignKey: "category_id" });

    Payment.hasMany(Order, { foreignKey: "payment_id" });
    Order.belongsTo(Payment, { foreignKey: "payment_id" });

    Unit.hasMany(Product, { foreignKey: "unit_id" });
    Product.belongsTo(Unit, { foreignKey: "unit_id" });

    User.hasMany(Order, { foreignKey: "user_id" });
    Order.belongsTo(User, { foreignKey: "user_id" });

    User.hasOne(Role, { foreignKey: "user_id" });
    Role.belongsTo(User, { foreignKey: "user_id" });

    User.hasOne(Pharmacy, { foreignKey: "user_id" });
    Pharmacy.belongsTo(User, { foreignKey: "user_id" });

    LOGGER.info("Database connect success");
  })
  .catch((error) =>
  {
    LOGGER.error("Database connect fail: ", error.message);
  });

httpServer.listen(app.get("port"), () =>
{
  var port = httpServer.address().port;
  console.log("Running on : ", port);
});
