import React from 'react';
import {Overlay} from 'react-native-elements';
import api from '../../../../services/api';
import {AddButton, AddInput, Text} from './styles';

const UpdateCredentialModal = ({
  setUpdatePassword,
  handleUpdatePassword,
  visible,
  toggleOverlay,
  updatePassword,
}) => {
  return (
    <Overlay
      isVisible={visible?.visible}
      onBackdropPress={() => toggleOverlay('up')}>
      <>
        <Text style={{fontSize: 18, marginBottom: 20}}>Atualizar senha</Text>
        <AddInput
          value={updatePassword}
          placeholder="Nova Senha..."
          secureTextEntry={true}
          onChangeText={(text) => setUpdatePassword(text)}
        />
        <AddButton onPress={() => handleUpdatePassword(visible.id)}>
          <Text style={{color: '#fff'}}>Atualizar</Text>
        </AddButton>
      </>
    </Overlay>
  );
};

export default UpdateCredentialModal;
