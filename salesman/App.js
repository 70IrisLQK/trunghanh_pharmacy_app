import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screen/SplashScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import ForgotPasswordScreen from './src/screen/ForgotPasswordScreen';
import OTPScreen from './src/screen/OTPScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import NewProductScreen from './src/screen/NewProductScreen';
import PopularProductScreen from './src/screen/PopularProductScreen';
import ProductsScreen from './src/screen/ProductsScreen';
import AddressScreen from './src/screen/AddressScreen';
import ProductView from './src/screen/ProductView';
import PlaceOrderScreen from './src/screen/PlaceOrderScreen';
import OrderDetailScreen from './src/screen/OrderDetailScreen';
import MyOrder from './src/screen/MyOrderScreen';
import RouteScreen from './src/screen/RouteScreen';
import ProblemScreen from './src/screen/ProblemScreen';
import DetailPharmacyScreen from './src/screen/DetailPharmacyScreen';
import CheckInScreen from './src/screen/CheckinScreen';
import PlaceOrderCheckInScreen from './src/screen/PlaceOrderCheckInScreen';
import ImageScreen from './src/screen/ImageScreen';
import ListProblemScreen from './src/screen/ListProblemScreen';
import ListPharmacyScreen from './src/screen/ListPharmacyScreen';
import CategoryProblemScreen from './src/screen/CategoryProblemScreen';
import AddProblemScreen from './src/screen/AddProblemScreen';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-feather1s';
import AddProblemCheckInScreen from './src/screen/AddProblemCheckInScreen';
import ProductPopularViewScreen from './src/screen/ProductPopularViewScreen';
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const ProductStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Bottom = createBottomTabNavigator();

global.currentScreenIndex = 0;

const TabBar = () =>
{
  return (
    <Bottom.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#44C062',
        activeTintColor: 'white',
        inactiveTintColor: '#99C68E',
        inactiveBackgroundColor: 'white',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) =>
        {
          let iconName;
          if (route.name === 'Home')
          {
            iconName = 'list';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          } else if (route.name === 'Profile')
          {
            iconName = 'user';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          } else if (route.name === 'Route')
          {
            iconName = 'send';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          } else if (route.name === 'Order')
          {
            iconName = 'file-text';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          } else if (route.name === 'Note')
          {
            iconName = 'file-plus';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          }
          else if (route.name === 'Category')
          {
            iconName = 'grid';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Bottom.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
        }}
      />
      <Bottom.Screen
        name="Route"
        component={RouteScreen}
        options={{
          title: 'Đi tuyến',
        }}
      />

      <Bottom.Screen
        name="Order"
        component={MyOrder}
        options={{
          title: 'Đơn hàng',
        }}
      />
      <Bottom.Screen
        name="Note"
        component={ListProblemScreen}
        options={{
          title: 'Ghi chú',
        }}
      />
    </Bottom.Navigator>
  );
};
class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
  }

  createDrawer = () => (
    <Drawer.Navigator
      initialRouteName="Home"
      contentOptions={(activeTintColor = 'red')}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={TabBar} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Route" component={RouteScreen} />
      <Drawer.Screen name="NewProducts" component={NewProductScreen} />
      <Drawer.Screen name="ListPharmacy" component={ListPharmacyScreen} />
      <Drawer.Screen name="CategoryProblem" component={CategoryProblemScreen} />
      <Drawer.Screen name="AddProblem" component={AddProblemScreen} />
    </Drawer.Navigator>
  );

  MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <MainStack.Screen name="SplashScreen" component={SplashScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
    </MainStack.Navigator>
  );

  ProductStackScreen = () => (
    <ProductStack.Navigator
      initialRouteName="ProductView"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <ProductStack.Screen name="ProductView" component={ProductView} />
      <ProductStack.Screen name="ProductPopularView" component={ProductPopularViewScreen} />
      <ProductStack.Screen name="Products" component={ProductsScreen} />
      <ProductStack.Screen name="Address" component={AddressScreen} />
      <ProductStack.Screen name="Home" component={HomeScreen} />
      <ProductStack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
      <ProductStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <ProductStack.Screen name="Problem" component={ProblemScreen} />
      <ProductStack.Screen
        name="DetailPharmacy"
        component={DetailPharmacyScreen}
      />
      <ProductStack.Screen name="CheckIn" component={CheckInScreen} />
      <ProductStack.Screen
        name="PopularProducts"
        component={PopularProductScreen}
      />
      <ProductStack.Screen
        name="PlaceOrderCheckIn"
        component={PlaceOrderCheckInScreen}
      />
      <ProductStack.Screen name="Image" component={ImageScreen} />
      <ProductStack.Screen
        name="AddProblemCheckIn"
        component={AddProblemCheckInScreen}
      />
    </ProductStack.Navigator>
  );

  RootStackScreen = () => (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <RootStack.Screen name="Main" component={this.MainStackScreen} />
      <RootStack.Screen
        name="ProductView"
        component={this.ProductStackScreen}
      />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="OTP" component={OTPScreen} />
      <RootStack.Screen
        name="ForgetPassword"
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen name="HomeScreen" children={this.createDrawer} />
    </RootStack.Navigator>
  );

  async componentDidMount() { }

  render()
  {
    return <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>;
  }
}

export default App;
