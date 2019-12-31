import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';

import formatDistance from 'date-fns/formatDistance';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

import { List, Item, Text, Created } from './styles';

function CheckIns({ navigation, isFocused }) {
  const [checkins, setCheckins] = useState([]);

  const userId = useSelector(state => state.auth.id);

  async function loadCheckins(id) {
    const { data } = await api.get(`students/${id}/checkins`);
    const checkin = data.map(r => ({
      ...r,
      distanceTime: formatDistance(new Date(r.createdAt), new Date(), {
        locale: pt,
      }),
    }));
    setCheckins(checkin);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins(userId);
    }
  }, [isFocused, userId]);

  async function handleSubmit() {
    try {
      await api.post(`students/${userId}/checkins`).then(async r => {
        Alert.alert('Checkin realizado com sucesso');
      });
    } catch (error) {
      Alert.alert('Número máximo de checkins semanais atingidos');
    }
    loadCheckins(userId);
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
      {checkins ? (
        <List
          data={checkins}
          keyExtractor={check => String(check.id)}
          renderItem={({ item }) => (
            <Item>
              <Text>Check-in #{item.id}</Text>
              <Created>{item.distanceTime}</Created>
            </Item>
          )}
        />
      ) : (
        false
      )}
    </Background>
  );
}

export default withNavigationFocus(CheckIns);
