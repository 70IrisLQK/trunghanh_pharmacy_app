import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';
import CategoryScreen from '../screen/CategoryScreen';
import NewProductScreen from '../screen/NewProductScreen';
import PopularProductScreen from '../screen/PopularProductScreen';
import ProductsScreen from '../screen/ProductsScreen';
import AddressScreen from '../screen/AddressScreen';
import ProductView from '../screen/ProductView';
import OrderDetailScreen from '../screen/OrderDetailScreen';
import ThankYou from '../screen/ThankYou';
import MyCartScreen from '../screen/MyCartScreen';
import MyOrder from '../screen/MyOrderScreen';
import CustomSidebarMenu from './CustomSidebarMenu';
import AsyncStorage from '@react-native-community/async-storage';
import ProblemScreen from '../screen/ProblemScreen';
import FlagScreen from '../screen/FlagScreen';
import FlagDetailScreen from '../screen/FlagDetailScreen';
import AddFlagScreen from '../screen/AddFlagScreen';
import CategoryFlagScreen from '../screen/CategoryFlagScreen';
import ListProblemScreen from '../screen/ListProblemScreen';
import CategoryProblemScreen from '../screen/CategoryProblemScreen';
import AddProblemScreen from '../screen/AddProblemScreen';
import PharmacyScreen from '../screen/PharmacyScreen';
import RouteScreen from '../screen/RouteScreen';
import DetailPharmacyScreen from '../screen/DetailPharmacyScreen';
import TabRouteScreen from '../screen/TabRouteScreen';
import CheckInScreen from '../screen/CheckinScreen';
import ListPharmacyScreen from '../screen/ListPharmacyScreen';
import PlaceOrderScreen from '../screen/PlaceOrderScreen';
import BottomTabNavigator from './TabNavigator';
import PlaceOrderCheckInScreen from '../screen/PlaceOrderCheckInScreen';
import ImageScreen from '../screen/ImageScreen';
import AddProblemCheckInScreen from '../screen/AddProblemCheckInScreen';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const ProductStack = createStackNavigator();
const RouteStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProblemStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const createDrawer = () => {
  let activeTintColor = '';
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      contentOptions={(activeTintColor = 'red')}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="NewProducts" component={NewProductScreen} />
      <Drawer.Screen name="PopularProducts" component={PopularProductScreen} />
      <Drawer.Screen name="Problem" component={ProblemScreen} />
      <Drawer.Screen name="MyOrder" component={MyOrder} />
      <Drawer.Screen name="Flag" component={FlagScreen} />
      <Drawer.Screen name="FlagDetail" component={FlagDetailScreen} />
      <Drawer.Screen name="AddFlag" component={AddFlagScreen} />
      <Drawer.Screen name="CategoryFlag" component={CategoryFlagScreen} />
      <Drawer.Screen name="ListProblem" component={ListProblemScreen} />
      <Drawer.Screen name="CategoryProblem" component={CategoryProblemScreen} />
      <Drawer.Screen name="Pharmacy" component={PharmacyScreen} />
      <Drawer.Screen name="Route" component={RouteScreen} />
      <Drawer.Screen
        name="PlaceOrderCheckIn"
        component={PlaceOrderCheckInScreen}
      />
      <Drawer.Screen name="Image" component={ImageScreen} />
    </Drawer.Navigator>
  );
};

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
    </MainStack.Navigator>
  );
};
const ProductStackScreen = () => {
  return (
    <ProductStack.Navigator
      initialRouteName="HomeProduct"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <ProductStack.Screen name="HomeProduct" component={HomeScreen} />
      <ProductStack.Screen name="ProductView" component={ProductView} />
      <ProductStack.Screen name="Profile" component={ProfileScreen} />
      <ProductStack.Screen name="Products" component={ProductsScreen} />
      <ProductStack.Screen name="NewProduct" component={NewProductScreen} />
      <ProductStack.Screen name="Problem" component={ProblemScreen} />
    </ProductStack.Navigator>
  );
};

const ProblemStackScreen = () => {
  return (
    <ProblemStack.Navigator
      initialRouteName="HomeProblem"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <ProblemStack.Screen name="ListProblem" component={ListProblemScreen} />
      <ProblemStack.Screen name="ListPharmacy" component={ListPharmacyScreen} />
    </ProblemStack.Navigator>
  );
};

const RouteStackScreen = () => {
  return (
    <RouteStack.Navigator
      initialRouteName="Route"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <RouteStack.Screen name="Route" component={RouteScreen} />
      <RouteStack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <RouteStack.Screen name="TabRoute" component={TabRouteScreen} />
      <RouteStack.Screen
        name="DetailPharmacy"
        component={DetailPharmacyScreen}
      />
      <RouteStack.Screen name="CheckIn" component={CheckInScreen} />
      <RouteStack.Screen name="ListPharmacy" component={ListPharmacyScreen} />
      <RouteStack.Screen
        name="PlaceOrderCheckIn"
        component={PlaceOrderCheckInScreen}
      />
      <RouteStack.Screen
        name="CategoryProblem"
        component={CategoryProblemScreen}
      />
      <RouteStack.Screen name="Image" component={ImageScreen} />
      <RouteStack.Screen
        name="AddProblemCheckIn"
        component={AddProblemCheckInScreen}
      />
      <RouteStack.Screen
        name="PopularProducts"
        component={PopularProductScreen}
      />
    </RouteStack.Navigator>
  );
};

const OrderStackScreen = () => {
  return (
    <OrderStack.Navigator
      initialRouteName="ProductView"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <OrderStack.Screen name="ProductView" component={ProductView} />
      <OrderStack.Screen name="Problem" component={ProblemScreen} />
      <OrderStack.Screen name="Profile" component={ProfileScreen} />
      <OrderStack.Screen name="Products" component={ProductsScreen} />
      <OrderStack.Screen name="Address" component={AddressScreen} />
      <OrderStack.Screen name="Home" component={HomeScreen} />
      <OrderStack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <OrderStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <OrderStack.Screen name="ThankYou" component={ThankYou} />
      <OrderStack.Screen
        name="DetailPharmacy"
        component={DetailPharmacyScreen}
      />
      <OrderStack.Screen name="TabRoute" component={TabRouteScreen} />
      <OrderStack.Screen name="CheckIn" component={CheckInScreen} />
      <OrderStack.Screen name="ListPharmacy" component={ListPharmacyScreen} />
      <OrderStack.Screen
        name="CategoryProblem"
        component={CategoryProblemScreen}
      />
      <OrderStack.Screen name="AddProblem" component={AddProblemScreen} />
    </OrderStack.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <RootStack.Screen name="Main" component={MainStackScreen} />
      <RootStack.Screen name="HomeProduct" component={ProductStackScreen} />
      <RootStack.Screen name="HomeRoute" component={RouteStackScreen} />
      <RootStack.Screen name="HomeProblem" component={ProblemStackScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="HomeScreen" component={createDrawer} />
    </RootStack.Navigator>
  );
};

export {RootStackScreen, MainStackScreen, ProductStackScreen, RouteStackScreen};
