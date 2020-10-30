import React, {useState, useContext} from 'react';

import {Container, Button, Text, TextBottom, Title} from './styles';
import Input from '../../components/Input';
import {AuthContext} from '../../context/AuthContext';
const SignIn = ({navigation}) => {
  const [user, setUser] = useState({});
  const {signIn, hasToken} = useContext(AuthContext);
  console.log('2323', hasToken);
  return (
    <Container>
      <Title>Faça seu logon.</Title>
      <Input onChangeText={(text) => setUser({...user, email: text})} />
      <Input onChangeText={(text) => setUser({...user, password: text})} />
      <Button onPress={() => signIn(user)}>
        <Text>Entrar</Text>
      </Button>
      <TextBottom
        bottom={'200px'}
        color={'black'}
        onPress={() => navigation.navigate('cadastro')}>
        Cadastre-se
      </TextBottom>
      <TextBottom bottom={'160px'} color={'black'}>
        Esqueci a senha
      </TextBottom>
    </Container>
  );
};

export default SignIn;
