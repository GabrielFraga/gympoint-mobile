import React from 'react';
import { Image, View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CheckinIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HelpIcon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo-horizontal.png';

import SignIn from './pages/SignIn';
import CheckIns from './pages/CheckIns';
import HelpOrders from './pages/HelpOrders';

const LogoTitle = ({ navigation }) => {
  return (
    <View>
      <Image source={logo} />
    </View>
  );
};
const StackOptions = createStackNavigator(
  {
    CheckIns,
    HelpOrders,
  },
  {
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: {
      headerTitle: <LogoTitle />,
    },
  },
);

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIns: {
              screen: StackOptions,
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <CheckinIcon
                    name="map-marker-check"
                    size={20}
                    color={tintColor}
                  />
                ),
              },
            },
            HelpOrders: {
              screen: StackOptions,
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <HelpIcon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#ccc',
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
