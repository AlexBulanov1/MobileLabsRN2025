import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, View, ScrollView, ActivityIndicator } from 'react-native';

import GameCard from '../components/GameCard';
import FeaturedGameCard from '../components/FeaturedGameCard';
import CategoryButton from '../components/CategoryButton';

const API_URL = 'https://www.freetogame.com/api/games';

const CATEGORIES = ["PC", "Browser", "All"];

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
`;

const HeaderContainer = ({ featuredGame }) => (
  <>
    {featuredGame && <FeaturedGameCard game={featuredGame} />}
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
      {CATEGORIES.map(cat => <CategoryButton key={cat} title={cat} />)}
    </ScrollView>
  </>
);

export default function StoreScreen() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={props => props.theme.accent} />
      </LoadingContainer>
    );
  }

  const featuredGameData = games.length > 0 ? {
    id: games[0].id.toString(),
    title: games[0].title,
    subtitle: games[0].short_description,
    image: games[0].thumbnail,
  } : null;

  const gameListData = games.slice(1);

  return (
    <Container>
      <FlatList
        data={gameListData}
        renderItem={({ item }) => (
            <GameCard game={{
                id: item.id.toString(),
                title: item.title,
                price: `Genre: ${item.genre}`,
                image: item.thumbnail
            }} />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={<HeaderContainer featuredGame={featuredGameData} />}
        contentContainerStyle={{ padding: 15 }}
      />
    </Container>
  );
}