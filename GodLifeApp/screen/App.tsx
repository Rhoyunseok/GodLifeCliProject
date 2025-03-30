import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  SafeAreaView,
  NativeModules,
} from 'react-native';

const {InstalledApps} = NativeModules;

type AppInfo = {
  label: string;
  packageName: string;
  enabled: boolean;
};

const App = () => {
  const [apps, setApps] = useState<AppInfo[]>([]);

  useEffect(() => {
    InstalledApps.getInstalledApps()
      .then((result: any[]) => {
        const appList: AppInfo[] = result.map(app => ({
          ...app,
          enabled: false, // 기본은 제한 안함
        }));
        setApps(appList);
      })
      .catch((err: any) => {
        console.error('앱 목록 가져오기 실패:', err);
      });
  }, []);

  const toggleApp = (packageName: string) => {
    setApps(prev =>
      prev.map(app =>
        app.packageName === packageName ? {...app, enabled: !app.enabled} : app,
      ),
    );
  };

  const renderItem = ({item}: {item: AppInfo}) => (
    <View style={styles.item}>
      <Text style={styles.label}>{item.label}</Text>
      <Switch
        value={item.enabled}
        onValueChange={() => toggleApp(item.packageName)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>설치된 앱 목록</Text>
      <FlatList
        data={apps}
        keyExtractor={item => item.packageName}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default App;
