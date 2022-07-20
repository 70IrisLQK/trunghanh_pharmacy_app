import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  MainStackScreen,
  ProductStackScreen,
  RootStackScreen,
  RouteStackScreen,
} from './StackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trang chủ" component={RootStackScreen} />
      <Tab.Screen name="Đi tuyến" component={RouteStackScreen} />
      <Tab.Screen name="Đơn hàng" component={RouteStackScreen} />
      <Tab.Screen name="Ghi chú" component={RouteStackScreen} />
      <Tab.Screen name="Danh mục" component={RouteStackScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
