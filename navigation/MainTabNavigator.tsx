// navigation/MainTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/main/HomeScreen';
import StateScreen from '../screen/main/StateScreen';
import RewardScreen from '../screen/main/RewardScreen';
import ProfileScreen from '../screen/main/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="State" component={StateScreen} options={{ title: '통계' }} />
      <Tab.Screen name="Reward" component={RewardScreen} options={{ title: '리워드' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: '내정보' }} />
    </Tab.Navigator>
  );
}
