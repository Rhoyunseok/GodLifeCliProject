// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import RewardScreen from './screens/RewardScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = '';

            switch (route.name) {
              case '홈':
                iconName = 'home-outline';
                break;
              case '통계':
                iconName = 'bar-chart-outline';
                break;
              case '리워드':
                iconName = 'gift-outline';
                break;
              case '내정보':
                iconName = 'person-outline';
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="통계" component={StatsScreen} />
        <Tab.Screen name="리워드" component={RewardScreen} />
        <Tab.Screen name="내정보" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

