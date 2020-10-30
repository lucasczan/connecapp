import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f6fa;
`;

export const Button = styled.TouchableOpacity`
  background-color: #6d71f9;
  width: 80%;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 5px;
  margin-top: 30px;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: ${(props) => props?.color || '#ffff'};
`;
export const Title = styled.Text`
  font-size: 24px;
  color: black;
  margin-bottom: 50px;
`;

export const TextBottom = styled.Text`
  font-size: 18px;
  color: black;
  position: absolute;
  bottom: ${(props) => props?.bottom};
`;
