import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {ContactStackNavigator, RouteStackScreen} from './StackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ProductHome" component={TabNavigator} />
      <Drawer.Screen name="HomeRoute" component={RouteStackScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
