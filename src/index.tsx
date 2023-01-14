import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Screens } from './screens';

export const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Screens />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
