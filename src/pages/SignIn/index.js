import React from 'react';

import { Image } from 'react-native';
import logo from '~/assets/logo.png';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Background from '../../components/Background';
import { Container, Form } from './styles';

export default function SignIn() {
  function handleSubmit() {}
  return (
    <Background>
      <Container>
        <Image source={logo} width={90} height={68} />
        <Form>
          <Input
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <Button onPress={handleSubmit}>Entrar</Button>
        </Form>
      </Container>
    </Background>
  );
}
