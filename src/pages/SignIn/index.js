import React, {useState, useContext} from 'react';

import {Container, Button, Text, TextBottom, Title} from './styles';
import Input from '../../components/Input';
import {AuthContext} from '../../context/AuthContext';
import {Image} from 'react-native';
import signImage from './img/loginimage.png';
const SignIn = () => {
  const [user, setUser] = useState({});
  const {signIn} = useContext(AuthContext);
  return (
    <Container>
      <Image
        style={{width: 200, position: 'absolute', top: 150}}
        source={signImage}
      />
      <Title>Faça seu logon.</Title>
      <Input
        placeholder="Email..."
        onChangeText={(text) => setUser({...user, email: text})}
      />
      <Input
        placeholder="Senha..."
        secureTextEntry={true}
        onChangeText={(text) => setUser({...user, password: text})}
      />
      <Button onPress={() => signIn(user)}>
        <Text>Entrar</Text>
      </Button>
    </Container>
  );
};

export default SignIn;
