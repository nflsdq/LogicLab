import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'components/Home';
import ScanScreen from 'components/ScanScreen';
import ManualInputScreen from 'components/ManualInputScreen';
import ResultScreen from 'components/ResultScreen';
import { StatusBar } from 'expo-status-bar';
import { LogicGateType } from 'utils/logicGates';

import './global.css';

export type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  ManualInput: undefined;
  Result: {
    inputA: string;
    inputB: string;
    logicGate: LogicGateType;
    source: 'scan' | 'manual';
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="ManualInput" component={ManualInputScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
