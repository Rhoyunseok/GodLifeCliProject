import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  SafeAreaView,
  NativeModules,
  Image,
} from 'react-native';

const {InstalledApps} = NativeModules;

type AppInfo = {
  label: string;
  packageName: string;
  icon: string;
  enabled: boolean;
};

const App = () => {
  const [apps, setApps] = useState<AppInfo[]>([]);

  useEffect(() => {
    InstalledApps.getInstalledApps()
      .then((result: any[]) => {
        const appList: AppInfo[] = result.map(app => ({
          ...app,
          enabled: false,
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
      <Image
        source={{uri: `data:image/png;base64,${item.icon}`}}
        style={styles.icon}
      />
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default App;
