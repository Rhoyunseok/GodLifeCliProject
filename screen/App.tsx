// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './screens/navigation/AuthStack'; // 경로는 맞게 수정

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
