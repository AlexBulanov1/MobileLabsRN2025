import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from '../styles/theme';
import { GameContext } from '../context/GameContext';
import ClickableObject from '../components/ClickableObject';

export default function GameScreen() {
  const { gameState } = useContext(GameContext);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{gameState.score}</Text>
      </View>
      <View style={styles.gameArea}>
        <ClickableObject />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.large * 2,
  },
  scoreText: {
    fontSize: theme.typography.h1 + 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});