import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${props => props.theme.text};
`;

export default function StoreScreen() {
  return (
    <Container>
      <Title>Store</Title>
    </Container>
  );
}