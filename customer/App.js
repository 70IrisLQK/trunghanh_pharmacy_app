import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screen/SplashScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import CategoryScreen from './src/screen/CategoryScreen';
import NewProductScreen from './src/screen/NewProductScreen';
import PopularProductScreen from './src/screen/PopularProductScreen';
import ProductsScreen from './src/screen/ProductsScreen';
import AddressScreen from './src/screen/AddressScreen';
import ProductView from './src/screen/ProductView';
import PlaceOrder from './src/screen/PlaceOrder';
import OrderDetailScreen from './src/screen/OrderDetailScreen';
import ThankYou from './src/screen/ThankYou';
import MyCartScreen from './src/screen/MyCartScreen';
import MyOrder from './src/screen/MyOrderScreen';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-feather1s';
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
          } else if (route.name === 'Category')
          {
            iconName = 'grid';
            size = focused ? 25 : 15;
            color = focused ? 'white' : '#99C68E';
          } else if (route.name === 'Order')
          {
            iconName = 'file-text';
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
        name="Category"
        component={CategoryScreen}
        options={{
          title: 'Danh mục',
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
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Tài khoản',
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
      <Drawer.Screen name="Category" component={CategoryScreen} />
      <Drawer.Screen name="NewProducts" component={NewProductScreen} />
      <Drawer.Screen name="PopularProducts" component={PopularProductScreen} />
      <Drawer.Screen name="MyCart" component={MyCartScreen} />
      <Drawer.Screen name="MyOrder" component={MyOrder} />
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
      <ProductStack.Screen name="Products" component={ProductsScreen} />
      <ProductStack.Screen name="Address" component={AddressScreen} />
      <ProductStack.Screen name="Home" component={HomeScreen} />
      <ProductStack.Screen name="PlaceOrder" component={PlaceOrder} />
      <ProductStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <ProductStack.Screen name="ThankYou" component={ThankYou} />
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
