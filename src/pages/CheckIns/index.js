import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '~/components/Background';

// import { Container } from './styles';

export default function CheckIns() {
  return <Background />;
}

CheckIns.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="map-marker-check" size={20} color={tintColor} />
  ),
};
