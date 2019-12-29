import React from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

// import { Container } from './styles';

export default function HelpOrders() {
  return <Background />;
}

const LogoTitle = ({ navigation }) => {
  return (
    <View>
      <Text>Teste</Text>
      {/* <Image source={logo} /> */}
    </View>
  );
};
HelpOrders.navigationOptions = {
  title: 'aaa',
};
// HelpOrders.navigationOptions = {
//   tabBarLabel: 'Pedir Ajuda',
//   tabBarIcon: ({ tintColor }) => (
//     <Icon name="live-help" size={20} color={tintColor} />
//   ),
// };
