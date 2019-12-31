import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';

import formatDistance from 'date-fns/formatDistance';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

import { List, Item, Question, Created, Status, Stats } from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const userId = useSelector(state => state.auth.id);

  async function loadHelpOrders(id) {
    const { data } = await api.get(`students/${id}/help-orders`);
    const order = data.order.map(h => ({
      ...h,
      distanceTime: formatDistance(new Date(h.createdAt), new Date(), {
        locale: pt,
      }),
    }));
    setHelpOrders(order);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders(userId);
    }
  }, [isFocused, userId]);

  async function handleSubmit() {
    try {
      await api.post(`students/${userId}/help-orders`).then(async r => {
        Alert.alert('Peido enviado com sucesso! Aguarde uma resposta');
      });
    } catch (error) {
      Alert.alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
    loadHelpOrders(userId);
  }
  return (
    <Background>
      <Button
        style={{
          marginBottom: 15,
        }}
        onPress={handleSubmit}>
        Novo check-in
      </Button>
      {helpOrders ? (
        <List
          data={helpOrders}
          keyExtractor={help => String(help.id)}
          renderItem={({ item }) => (
            <Item>
              <Stats>
                <Status answer={item.answer}>
                  <Icon name="check-circle" size={20} />
                  {item.answer ? 'Respondido' : 'Sem Resposta'}{' '}
                </Status>
                <Created>{item.distanceTime}</Created>
              </Stats>

              <Question>{item.question}</Question>
            </Item>
          )}
        />
      ) : (
        false
      )}
    </Background>
  );
}

export default withNavigationFocus(HelpOrders);
