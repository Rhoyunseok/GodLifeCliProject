// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { auth } from '../../firebase';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>홈 화면</Text>
        <Button title="로그아웃" onPress={() => auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },
});