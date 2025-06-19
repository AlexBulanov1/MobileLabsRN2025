import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const GameImage = styled.Image`
  width: 120px;
  height: 90px;
`;

const InfoContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: bold;
`;

const Price = styled.Text`
  color: ${props => props.theme.accent};
  font-size: 14px;
  margin-top: 5px;
`;

export default function GameCard({ game }) {
  return (
    <CardContainer>
      <GameImage source={{ uri: game.image }} />
      <InfoContainer>
        <Title>{game.title}</Title>
        <Price>{game.price}</Price>
      </InfoContainer>
    </CardContainer>
  );
}