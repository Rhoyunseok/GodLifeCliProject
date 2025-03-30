import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Text,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}

const KakaoMapView = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '위치 권한 요청',
            message: '현재 위치를 가져오려면 위치 권한이 필요합니다.',
            buttonPositive: '허용',
          }
        );
        console.log('🛡 권한 상태:', granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('❌ 권한 요청 에러:', err);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setErrorMsg('위치 권한이 거부되었습니다.');
        setLocation({ latitude: 37.5665, longitude: 126.9780 }); // fallback
        return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('✅ 현재 위치:', latitude, longitude);
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('❌ 위치 가져오기 실패:', error.code, error.message);
          setErrorMsg(`위치를 가져올 수 없습니다 (${error.message})`);
          setLocation({ latitude: 37.5665, longitude: 126.9780 }); // fallback
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        }
      );
    };

    getCurrentLocation();
  }, []);

  if (!location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>📍 현재 위치를 불러오는 중...</Text>
      </View>
    );
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        html, body, #map {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
      <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey="여기다 키 넣으셈"=false"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        kakao.maps.load(function () {
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(${location.latitude}, ${location.longitude}),
            level: 3
          };
          var map = new kakao.maps.Map(container, options);

          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(${location.latitude}, ${location.longitude})
          });
          marker.setMap(map);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={styles.webview}
      />
      {errorMsg !== '' && (
        <View style={styles.errorBox}>
          <Text style={{ color: 'red' }}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBox: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
});

export default KakaoMapView;
