import React, {useEffect, useContext, useState} from 'react';
import {
  Container,
  CredentialBox,
  Text,
  AddCredential,
  RemoveCRedential,
  UpdateCredential,
  TextCredentialsBox,
  LogOutContainer,
  AddInput,
  AddButton,
  SwitchContainer,
  ContainerList,
  List,
  Title,
} from './styles';
import {api} from '../../services/api';
import {AuthContext} from '../../context/AuthContext';
import {Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {useCallback} from 'react';
import {Switch, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import avatar from './img/avatar.png';

Icon.loadFont();

const Home = () => {
  const {accessToken, signOut, user} = useContext(AuthContext);
  const [credentials, setCredentials] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newCredential, setNewCredential] = useState({
    email: '',
    password: '',
    admin: false,
  });
  console.log(user);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    async function loadCredentials() {
      const response = await api.get('/credenciais', {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      const credentials = response.data.filter(
        (item) => item.email !== user.email,
      );
      setCredentials(credentials);
    }
    loadCredentials();
  }, [accessToken, user]);

  const handleDeleteCredential = useCallback(
    async (id) => {
      try {
        await api.delete(`/credenciais/${id}`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        setCredentials(
          credentials.filter((credential) => credential.codigo !== id),
        );
      } catch (error) {
        console.log(error);
      }
    },
    [credentials, accessToken],
  );

  const handleAddCredential = useCallback(async () => {
    try {
      const response = await api.post(
        '/credenciais',
        {
          email: newCredential.email,
          senha: newCredential.password,
          tipoUsuario: newCredential.admin ? 'ADMIN' : 'PADRAO',
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setCredentials([...credentials, response.data]);
      setVisible(!visible);
    } catch (error) {
      alert('Erro ao cadastrar credencial.');
    }
  }, [
    newCredential.email,
    newCredential.password,
    newCredential.admin,
    accessToken,
    credentials,
    visible,
  ]);

  return (
    <Container>
      <>
        <LogOutContainer onPress={() => signOut()}>
          <Icon name="logout" color="black" size={35} />
        </LogOutContainer>
        <Image
          style={{
            position: 'absolute',
            top: 170,
            height: 180,
            width: 180,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: '#fff',
          }}
          source={avatar}
        />
        <Title>Administração de credenciais</Title>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Text style={{fontSize: 18, marginBottom: 20}}>
            Adicionar credencial
          </Text>
          <AddInput
            placeholder="Email..."
            onChangeText={(text) =>
              setNewCredential({...newCredential, email: text})
            }
          />
          <AddInput
            placeholder="Senha..."
            onChangeText={(text) =>
              setNewCredential({...newCredential, password: text})
            }
          />
          <SwitchContainer>
            <Switch
              style={{marginTop: 15}}
              value={newCredential.admin}
              onValueChange={(e) =>
                setNewCredential({
                  ...newCredential,
                  admin: !newCredential.admin,
                })
              }
              trackColor={{false: '#fff', true: '#6d71f9'}}
            />
            <Text style={{marginTop: 15, marginLeft: 15}}>ADMIN</Text>
          </SwitchContainer>
          <AddButton onPress={() => handleAddCredential()}>
            <Text style={{color: '#fff'}}>Adicionar</Text>
          </AddButton>
        </Overlay>
        <AddCredential onPress={toggleOverlay}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Cadastrar credencial
          </Text>
        </AddCredential>
        <List>
          <FlatList
            style={{width: '100%', height: '100%'}}
            data={credentials}
            horizontal
            keyExtractor={(item) => item.codigo}
            renderItem={({item}) => {
              return (
                <ContainerList>
                  <CredentialBox
                    style={{
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowRadius: 10,
                      elevation: 1,
                    }}>
                    <Image
                      style={{height: 80, width: 80, borderRadius: 50}}
                      source={{
                        uri: `https://picsum.photos/id/${Math.floor(
                          Math.random() * 100,
                        )}/200/100`,
                      }}
                    />

                    <TextCredentialsBox>
                      <Text>{item.email}</Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {item.tipoUsuario}
                      </Text>
                    </TextCredentialsBox>
                    <RemoveCRedential
                      onPress={() => handleDeleteCredential(item.codigo)}>
                      <Text>
                        <Icon name="delete" color="#ffff" size={20} />
                      </Text>
                    </RemoveCRedential>
                    <UpdateCredential>
                      <Text>
                        <Icon name="edit" color="#ffff" size={20} />
                      </Text>
                    </UpdateCredential>
                  </CredentialBox>
                </ContainerList>
              );
            }}
          />
        </List>
      </>
    </Container>
  );
};

export default Home;
