import React from 'react';

import {InputCustom} from './styles';

const Input = ({onChangeText}) => {
  return <InputCustom onChangeText={(text) => onChangeText(text)} />;
};

export default Input;
