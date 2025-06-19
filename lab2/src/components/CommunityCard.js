import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ImageContainer = styled.View`
  height: 180px;
  width: 100%;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const PublisherLogoContainer = styled.View`
  position: absolute; /* Позиціонуємо відносно ImageContainer */
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  border-radius: 5px;
`;

const PublisherLogo = styled.Image`
  width: 50px;
  height: 50px;
`;

const TextContainer = styled.View`
  padding: 15px;
`;

const Title = styled.Text`
  color: ${props => props.theme.text};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: ${props => props.theme.textSecondary};
  font-size: 14px;
`;

export default function CommunityCard({ item }) {
  return (
    <CardContainer>
      <ImageContainer>
        <MainImage source={{ uri: item.mainImage }} resizeMode="cover" />
        <PublisherLogoContainer>
          <PublisherLogo source={{ uri: item.logo }} resizeMode="contain" />
        </PublisherLogoContainer>
      </ImageContainer>
      <TextContainer>
        <Title>{item.title}</Title>
        <Subtitle>{item.subtitle}</Subtitle>
      </TextContainer>
    </CardContainer>
  );
}