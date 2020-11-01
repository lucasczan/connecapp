import React from 'react';
import {Overlay} from 'react-native-elements';

import {AddButton, AddInput, Text, SwitchContainer} from './styles';
import {Switch} from 'react-native';

const AddCredentialModal = ({
  handleAddCredential,
  visible,
  toggleOverlay,
  setNewCredential,
  newCredential,
}) => {
  return (
    <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay('add')}>
      <>
        <Text style={{fontSize: 18, marginBottom: 20}}>
          Adicionar credencial
        </Text>
        <AddInput
          placeholder="Email..."
          value={newCredential?.email}
          onChangeText={(text) =>
            setNewCredential({...newCredential, email: text})
          }
        />
        <AddInput
          placeholder="Senha..."
          value={newCredential?.password}
          secureTextEntry={true}
          onChangeText={(text) =>
            setNewCredential({...newCredential, password: text})
          }
        />
        <SwitchContainer>
          <Switch
            style={{marginTop: 15}}
            value={newCredential?.admin}
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
      </>
    </Overlay>
  );
};

export default AddCredentialModal;
