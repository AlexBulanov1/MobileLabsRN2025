import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './src/navigation/TabNavigator';
import { darkTheme, lightTheme } from './src/theme/theme';

export const ThemeContext = React.createContext();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const themeContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme(isDark => !isDark);
    },
  }), []);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}