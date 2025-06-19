import React from 'react';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  background-color: ${props => props.theme.backgroundSecondary};
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const MainImage = styled.ImageBackground`
  height: 180px;
  justify-content: flex-end;
`;

const PublisherLogoContainer = styled.View`
  position: absolute;
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
      <MainImage source={{ uri: item.mainImage }}>
        <PublisherLogoContainer>
          <PublisherLogo source={{ uri: item.logo }} resizeMode="contain" />
        </PublisherLogoContainer>
      </MainImage>
      <TextContainer>
        <Title>{item.title}</Title>
        <Subtitle>{item.subtitle}</Subtitle>
      </TextContainer>
    </CardContainer>
  );
}