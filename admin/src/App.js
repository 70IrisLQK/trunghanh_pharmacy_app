import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import EditNoteMain from "./components/notes/EditNoteMain";
import EditNoteTypeMain from "./components/notetypes/EditNoteTypeMain";
import EditOrder from "./components/orders/EditOrder";
import EditRouteMain from "./components/route/EditRouteMain";
import PrivateRouter from "./PrivateRouter";
import { listNotes } from "./Redux/Actions/NoteActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import { listProducts } from "./Redux/Actions/ProductActions";
import "./responsive.css";
import AddNote from "./screens/AddNote";
import AddNoteType from "./screens/AddNoteType";
import AddProduct from "./screens/AddProduct";
import AddRoute from "./screens/AddRoute";
import CategoriesScreen from "./screens/CategoriesScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import NoteScreen from "./screens/NoteScreen";
import NoteTypeScreen from "./screens/NoteTypeScreen";
import NotFound from "./screens/NotFound";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductScreen from "./screens/productScreen";
import RouteScreen from "./screens/RouteScreen";
import SalesmanScreen from "./screens/SalesmanScreen";
import UserOrderDetailScreen from "./screens/UserOrderDetailScreen";
import UsersScreen from "./screens/UsersScreen";
function App()
{
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() =>
  {
    if (
      userInfo &&
      (userInfo.user.role_id === "94C7AFC2-1B38-4D3D-9851-3A1419016AE3" ||
        userInfo.user.role_id === "B896936E-EF5A-4332-8872-46301343805C")
    )
    {
      dispatch(listProducts());
      dispatch(listOrders());
      dispatch(listNotes());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/edit_order/:id" component={EditOrder} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/user/:id" component={UserOrderDetailScreen} />
          <PrivateRouter path="/sellers" component={SalesmanScreen} />
          <PrivateRouter path="/managerRoute" component={Route} />
          <PrivateRouter path="/notes" component={NoteScreen} />
          <PrivateRouter path="/addnote" component={AddNote} />
          <PrivateRouter path="/edit_note/:id" component={EditNoteMain} />
          <PrivateRouter path="/notetypes" component={NoteTypeScreen} />
          <PrivateRouter path="/add_notetype" component={AddNoteType} />
          <PrivateRouter
            path="/edit_notetype/:id"
            component={EditNoteTypeMain}
          />
          <PrivateRouter path="/routes" component={RouteScreen} />
          <PrivateRouter path="/edit_route/:id" component={EditRouteMain} />
          <PrivateRouter path="/add_route" component={AddRoute} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
