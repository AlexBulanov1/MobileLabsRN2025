import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { theme } from '../styles/theme';

export default function GameScreen() {
  const [score, setScore] = useState(0);

  const singleTap = Gesture.Tap()
    .onEnd(() => {
      setScore(prev => prev + 1);
    });
  
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      setScore(prev => prev + 2);
    });

  const longPress = Gesture.LongPress()
    .minDuration(800)
    .onStart(() => {
      setScore(prev => prev + 10);
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);
  const gestures = Gesture.Race(taps, longPress);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.gameArea}>
        <GestureDetector gesture={gestures}>
            <Animated.View style={styles.clickableObject} />
        </GestureDetector>
      </View>
    </View>
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
  clickableObject: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.primary,
    borderRadius: 75,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
});