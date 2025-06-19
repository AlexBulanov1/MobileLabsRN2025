import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.TouchableOpacity`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end; /* Розміщуємо текст внизу */
`;

const InfoContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px;
`;

const Title = styled.Text`
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
`;
const Subtitle = styled.Text`
  color: #E7E9EA;
  font-size: 14px;
`;

export default function FeaturedGameCard({ game }) {
  return (
    <CardContainer>
      <BackgroundImage source={{ uri: game.image }}>
        <InfoContainer>
          <Title>{game.title}</Title>
          <Subtitle>{game.subtitle}</Subtitle>
        </InfoContainer>
      </BackgroundImage>
    </CardContainer>
  );
}