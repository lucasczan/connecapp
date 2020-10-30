import React from 'react';

import {Container, Button, Text, TextBottom, Title} from './styles';
import Input from '../../components/Input';

const SignUp = ({navigation}) => {
  return (
    <Container>
      <Title>Faça seu cadastro.</Title>
      <Input />
      <Input />
      <Input />
      <Button>
        <Text>Cadastrar</Text>
      </Button>
      <TextBottom
        bottom={'200px'}
        color={'black'}
        onPress={() => navigation.navigate('login')}>
        Voltar
      </TextBottom>
    </Container>
  );
};

export default SignUp;
