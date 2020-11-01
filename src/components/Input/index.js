import React from 'react';

import {InputCustom} from './styles';

const Input = ({onChangeText, secureTextEntry, placeholder}) => {
  return (
    <InputCustom
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={(text) => onChangeText(text)}
    />
  );
};

export default Input;
