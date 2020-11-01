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
  ContainerList,
  List,
  Title,
} from './styles';
import {api} from '../../services/api';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/AntDesign';
import {useCallback} from 'react';
import {Image, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import avatar from './img/avatar.png';
import AddCredentialModal from './components/AddCredentialModal';
import UpdatePasswordModal from './components/UpdatePasswordModal';
Icon.loadFont();

const Home = () => {
  const {accessToken, signOut, user} = useContext(AuthContext);
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCredentialModal, setVisibleCridentialModal] = useState(false);
  const [updatePassword, setUpdatePassword] = useState('');
  const [visibleUpdateModal, setVisibleUpdateModal] = useState({
    visible: false,
    id: undefined,
  });
  const [newCredential, setNewCredential] = useState({
    email: '',
    password: '',
    admin: false,
  });
  const toggleOverlayCredentialModal = (id) => {
    if (id === 'add') {
      setVisibleCridentialModal(!visibleCredentialModal);
    } else {
      setVisibleUpdateModal({
        visible: !visibleUpdateModal.visible,
        id: undefined,
      });
    }
  };
  const Options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    async function loadCredentials() {
      try {
        const response = await api.get('/credenciais', {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const loadcredentials = response.data.filter(
          (item) => item.email !== user.email,
        );
        setCredentials(loadcredentials);
        setLoading(false);
      } catch (error) {
        alert('Erro ao carregar as credenciais');
      }
    }
    loadCredentials();
  }, [accessToken, user]);

  const handleDeleteCredential = useCallback(
    async (id) => {
      if (id !== 1) {
        try {
          await api.delete(`/credenciais/${id}`, Options);
          setCredentials(
            credentials.filter((credential) => credential.codigo !== id),
          );
          alert('Credencial deletada com sucesso!');
        } catch (error) {
          alert('Erro ao deletar essa credencial');
        }
      } else {
        alert('você não tem permissão para remover essa credencial');
      }
    },
    [Options, credentials],
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
        Options,
      );
      setCredentials([...credentials, response.data]);
      alert('Credencial criada com sucesso!');
      setNewCredential({});
    } catch (error) {
      alert('Erro ao cadastrar credencial.');
    }
  }, [
    newCredential.email,
    newCredential.password,
    newCredential.admin,
    Options,
    credentials,
  ]);

  const handleUpdatePassword = useCallback(
    async (id) => {
      try {
        await api.put(
          `/credenciais/${id}/senha`,
          {
            senhaAntiga: '',
            novaSenha: updatePassword,
          },
          Options,
        );
        alert('Senha atualizada com suceso!');
        setVisibleUpdateModal({
          ...visibleUpdateModal,
          id: undefined,
        });
        setUpdatePassword('');
      } catch (error) {
        alert('Erro ao atualizar a senha.');
      }
    },
    [updatePassword, Options, visibleUpdateModal],
  );

  return (
    <Container>
      <>
        <UpdatePasswordModal
          updatePassword={updatePassword}
          toggleOverlay={toggleOverlayCredentialModal}
          visible={visibleUpdateModal}
          setUpdatePassword={setUpdatePassword}
          setVisibleUpdateModal={setVisibleUpdateModal}
          handleUpdatePassword={handleUpdatePassword}
        />
        <AddCredentialModal
          toggleOverlay={toggleOverlayCredentialModal}
          setVisible={setVisibleCridentialModal}
          visible={visibleCredentialModal}
          newCredential={newCredential}
          setNewCredential={setNewCredential}
          handleAddCredential={handleAddCredential}
        />
        <LogOutContainer onPress={() => signOut()}>
          <Icon name="logout" color="black" size={35} />
        </LogOutContainer>
        <Image
          style={{
            position: 'absolute',
            top: '15%',
            height: 180,
            width: 180,
            borderRadius: 100,
            borderWidth: 5,
            borderColor: '#fff',
          }}
          source={avatar}
        />
        <AddCredential onPress={() => toggleOverlayCredentialModal('add')}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Cadastrar credencial
          </Text>
        </AddCredential>
        <Title>Administração de credenciais</Title>
        <List>
          {loading ? (
            <ActivityIndicator
              style={{marginTop: 100}}
              size="large"
              color="#6d71f9"
            />
          ) : (
            <FlatList
              style={{width: '100%', height: '100%'}}
              data={credentials}
              horizontal
              keyExtractor={(item) => item.codigo.toString()}
              renderItem={({item}) => {
                return (
                  <ContainerList>
                    <CredentialBox
                      style={{
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                        elevation: 10,
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
                      <UpdateCredential
                        onPress={() => {
                          setVisibleUpdateModal({
                            visible: !visibleUpdateModal.visible,
                            id: item.codigo,
                          });
                        }}>
                        <Text>
                          <Icon name="edit" color="#ffff" size={20} />
                        </Text>
                      </UpdateCredential>
                    </CredentialBox>
                  </ContainerList>
                );
              }}
            />
          )}
        </List>
      </>
    </Container>
  );
};

export default Home;
