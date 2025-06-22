import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from '../styles/theme';
import ClickableObject from '../components/ClickableObject';

export default function GameScreen() {
  const [score, setScore] = useState(0);

  const handleGesture = (action) => {
    switch (action.type) {
        case 'SINGLE_TAP':
          setScore(prev => prev + 1);
          break;
        case 'DOUBLE_TAP':
          setScore(prev => prev + 2);
          break;
        case 'LONG_PRESS':
          setScore(prev => prev + 10);
          break;
        case 'FLING':
          setScore(prev => prev + action.payload.bonus);
          break;
        case 'PINCH_END':
            if (action.payload.bonus > 0) {
                setScore(prev => prev + action.payload.bonus);
            }
            break;
        case 'PAN_END':
        default:
          break;
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.gameArea}>
        <ClickableObject onGesture={handleGesture} />
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