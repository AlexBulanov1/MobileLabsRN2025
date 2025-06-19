import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import StoreScreen from '../screens/StoreScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ChatScreen from '../screens/ChatScreen';
import SafetyScreen from '../screens/SafetyScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme(); 

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: theme.backgroundSecondary,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Store" 
        component={StoreScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="globe-outline" color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Safety" 
        component={SafetyScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="shield-checkmark-outline" color={color} size={size} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}