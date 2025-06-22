import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

const initialTasks = [
    { id: '1', text: 'Зробити 10 кліків', target: 10, current: 0, key: 'tapCount', completed: false },
    { id: '2', text: 'Зробити подвійний клік 5 разів', target: 5, current: 0, key: 'doubleTapCount', completed: false },
    { id: '3', text: 'Утримувати об\'єкт 3 секунди', target: 1, current: 0, key: 'longPressCount', completed: false },
    { id: '4', text: 'Перетягнути об\'єкт', target: 1, current: 0, key: 'panCount', completed: false },
    { id: '5', text: 'Зробити свайп вправо', target: 1, current: 0, key: 'flingRightCount', completed: false },
    { id: '6', text: 'Зробити свайп вліво', target: 1, current: 0, key: 'flingLeftCount', completed: false },
    { id: '7', text: 'Змінити розмір об\'єкта', target: 1, current: 0, key: 'pinchCount', completed: false },
    { id: '8', text: 'Отримати 100 очок', target: 100, current: 0, key: 'score', completed: false },
];

const initialState = {
  score: 0,
  tapCount: 0,
  doubleTapCount: 0,
  longPressCount: 0,
  panCount: 0,
  flingRightCount: 0,
  flingLeftCount: 0,
  pinchCount: 0,
};

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialState);
  const [tasks, setTasks] = useState(initialTasks);

  const performAction = useCallback((action) => {
    setGameState(prev => {
      switch (action.type) {
        case 'SINGLE_TAP':
          return { ...prev, score: prev.score + 1, tapCount: prev.tapCount + 1 };
        case 'DOUBLE_TAP':
          return { ...prev, score: prev.score + 2, doubleTapCount: prev.doubleTapCount + 1 };
        case 'LONG_PRESS':
          return { ...prev, score: prev.score + 10, longPressCount: prev.longPressCount + 1 };
        case 'PAN_END':
          return { ...prev, panCount: prev.panCount + 1 };
        case 'FLING':
          return { 
            ...prev, 
            score: prev.score + action.payload.bonus,
            [action.payload.direction === 'right' ? 'flingRightCount' : 'flingLeftCount']: 
              prev[action.payload.direction === 'right' ? 'flingRightCount' : 'flingLeftCount'] + 1,
          };
        case 'PINCH_END':
          return {
            ...prev,
            score: prev.score + action.payload.bonus,
            pinchCount: prev.pinchCount + 1,
          };
        default:
          return prev;
      }
    });
  }, []);
  
  useEffect(() => {
    setTasks(prevTasks => 
        prevTasks.map(task => {
            if(task.completed) return task;
            const progress = gameState[task.key];
            const isCompleted = progress >= task.target;
            return { ...task, current: progress, completed: isCompleted };
        })
    );
  }, [gameState]);

  const contextValue = useMemo(() => ({
    gameState,
    tasks,
    performAction,
  }), [gameState, tasks, performAction]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};