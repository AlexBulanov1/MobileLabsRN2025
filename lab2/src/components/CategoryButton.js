import React from 'react';
import styled from 'styled-components/native';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.backgroundSecondary};
  padding: 8px 15px;
  border-radius: 20px;
  margin-right: 10px;
`;
const ButtonText = styled.Text`
  color: ${props => props.theme.accent};
  font-weight: bold;
`;

export default function CategoryButton({ title }) {
  return (
    <ButtonContainer>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}