import React from 'react';
import styled from 'styled-components/native';
import { FlatList, View, ScrollView } from 'react-native';

import GameCard from '../components/GameCard';
import FeaturedGameCard from '../components/FeaturedGameCard';
import CategoryButton from '../components/CategoryButton';

const FEATURED_GAME = {
  id: '1',
  title: 'Dead by Daylight',
  subtitle: 'Recommended for you',
  image: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg?t=1714421876',
};
const GAME_LIST = [
  { id: '2', title: 'Grand Theft Auto V', price: '$15', image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1714422223' },
  { id: '3', title: 'Battlefield 4', price: '$15', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg?t=1695232432' },
  { id: '4', title: 'Factorio', price: '$35', image: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg?t=1666695287' },
  { id: '5', title: 'Horizon Zero Dawn', price: '$50', image: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg?t=1695231737' },
];
const CATEGORIES = ["Free to play", "Early Access", "Specials"];

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const HeaderContainer = () => (
  <>
    <FeaturedGameCard game={FEATURED_GAME} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
      {CATEGORIES.map(cat => <CategoryButton key={cat} title={cat} />)}
    </ScrollView>
  </>
);

export default function StoreScreen() {
  return (
    <Container>
      <FlatList
        data={GAME_LIST}
        renderItem={({ item }) => <GameCard game={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={HeaderContainer}
        contentContainerStyle={{ padding: 15 }}
      />
    </Container>
  );
}