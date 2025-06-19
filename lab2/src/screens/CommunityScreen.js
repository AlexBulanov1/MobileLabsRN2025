import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import CommunityCard from '../components/CommunityCard';

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const HeaderText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${props => props.theme.text};
    padding: 20px 15px 0 15px;
`;

const COMMUNITY_DATA = [
  { 
    id: '1', 
    title: 'Florida tourist extraction uses Fortnite, seeks removal of in-game castle', 
    subtitle: 'Eurogamer',
    mainImage: 'https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/03/kingdom-come-deliverance-2-release-date.jpg',
    logo: 'https://pbs.twimg.com/profile_images/1460545375591931904/x_v5F65k_400x400.jpg'
  },
  { 
    id: '2', 
    title: 'New "Cyberpunk 2077" expansion announced for late 2025', 
    subtitle: 'CD Projekt Red',
    mainImage: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg?t=1717508643',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/CD_Projekt_logo.svg/1200px-CD_Projekt_logo.svg.png'
  },
];

export default function CommunityScreen() {
  return (
    <Container>
      <FlatList
        data={COMMUNITY_DATA}
        renderItem={({ item }) => <CommunityCard item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <HeaderText>Community</HeaderText>}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}
      />
    </Container>
  );
}