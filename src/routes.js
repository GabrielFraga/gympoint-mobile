import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import CheckIns from './pages/CheckIns';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator({
          CheckIns,
        }),
      },
      {
        initialRouteName: signedIn ? 'App' : Sign,
      },
    ),
  );
