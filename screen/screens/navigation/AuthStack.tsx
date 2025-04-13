import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../LoginScreen';
import SignUpScreen from '../SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerBackVisible: false, // 🔥 뒤로가기 버튼 제거
          title: "로그인", // 원하는 경우 타이틀 설정
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: "회원가입",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
