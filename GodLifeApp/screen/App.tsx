import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import KakaoMapView from './KakaoMapView';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <KakaoMapView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
