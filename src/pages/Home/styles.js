import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f7f6ff;
`;

export const LogOutContainer = styled.TouchableOpacity`
  position: absolute;
  top: 5%;
  left: 30px;
  transform: scaleX(-1);
`;
export const CredentialBox = styled.View`
  width: 200px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  height: 220px;
  margin: 5px;
  position: relative;
`;

export const AddCredential = styled.TouchableOpacity`
  position: absolute;
  top: 5%;
  right: 30px;
  background-color: #54ecbe;
  padding: 10px;
  border-radius: 8px;
`;

export const RemoveCRedential = styled.TouchableOpacity`
  position: absolute;
  bottom: 5px;
  right: 8px;
  width: 40px;
  background-color: #ec5b54;
  padding: 10px;
  border-radius: 5px;
`;

export const UpdateCredential = styled.TouchableOpacity`
  position: absolute;
  bottom: 5px;
  right: 63px;
  width: 40px;
  background-color: #6d71f9;
  padding: 10px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  position: absolute;
  font-size: 18px;
  top: 45%;
`;

export const TextCredentialsBox = styled.View`
  position: absolute;
  bottom: 50px;
  left: 20px;
`;

export const List = styled.View`
  width: 100%;
  align-items: center;
  height: 40%;
  padding-top: 20px;
  background-color: #f3f3f3;
  position: absolute;
  bottom: 0px;
`;

export const ContainerList = styled.View`
  margin-top: 5px;
  align-items: center;
  padding: 5px;
`;

export const Text = styled.Text``;
