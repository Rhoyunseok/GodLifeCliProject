// navigation/AppNavigator.tsx

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

export default function AppNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (User) => {
        console.log('🔥 onAuthStateChanged 실행됨:', user?.email ?? '없음');
      setUser(User);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    console.log('🌀 로딩 중...');
    return null; // 여기에 계속 머무르면 화면 안 나옴
  }

  return (
    <NavigationContainer>
      {user ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
