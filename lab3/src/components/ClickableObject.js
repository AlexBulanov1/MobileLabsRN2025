import React, { useContext } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { theme } from '../styles/theme';
import { GameContext } from '../context/GameContext';

export default function ClickableObject() {
  const { performAction } = useContext(GameContext);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const startPosition = useSharedValue({ x: 0, y: 0 });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const singleTap = Gesture.Tap().onEnd(() => {
    runOnJS(performAction)({ type: 'SINGLE_TAP' });
  });
  
  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(() => {
    runOnJS(performAction)({ type: 'DOUBLE_TAP' });
  });

  const longPress = Gesture.LongPress().minDuration(800).onStart(() => {
    runOnJS(performAction)({ type: 'LONG_PRESS' });
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      startPosition.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = startPosition.value.x + event.translationX;
      translateY.value = startPosition.value.y + event.translationY;
    })
    .onEnd((event) => {
      runOnJS(performAction)({ type: 'PAN_END' });
      
      let flingDirection = null;
      if (event.velocityX > 800) flingDirection = 'right';
      else if (event.velocityX < -800) flingDirection = 'left';

      if (flingDirection) {
        const bonus = Math.floor(Math.random() * 10) + 5;
        runOnJS(performAction)({ type: 'FLING', payload: { bonus, direction: flingDirection } });
        runOnJS(Alert.alert)(`Свайп ${flingDirection}!`, `+${bonus} очок!`);
      }
      
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });
  
  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      let bonus = 0;
      if (scale.value > 1.8) {
        bonus = 15;
        runOnJS(Alert.alert)('Великий бонус!', `+${bonus} очок!`);
      }
      runOnJS(performAction)({ type: 'PINCH_END', payload: { bonus } });
      
      scale.value = withSpring(1);
      savedScale.value = 1;
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);
  const composedGestures = Gesture.Race(pan, pinch, longPress, taps);

  return (
    <GestureDetector gesture={composedGestures}>
        <Animated.View style={[styles.clickableObject, animatedStyle]}>
            <Text style={styles.objectText}>Тягни!</Text>
        </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  clickableObject: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  objectText: {
    fontSize: theme.typography.button,
    color: 'white',
    fontWeight: 'bold',
  },
});