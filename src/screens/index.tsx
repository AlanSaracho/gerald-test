import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Linking } from "react-native";
import { createDrawerMenuNavigator } from "../DrawerMenuNavigator";
import { BlankScreen } from './Blank';

export type HomeStackParamList = {
  screen1: undefined;
  screen2: undefined;
};

export type TabsParamList = {
  home: NavigatorScreenParams<HomeStackParamList>;
  contact: undefined;
};

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  Dos: undefined;
  Tres: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();
const Drawer = createDrawerMenuNavigator<DrawerParamList>();

const Home = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="screen1" component={BlankScreen} />
    <HomeStack.Screen name="screen2" component={BlankScreen} />
  </HomeStack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator screenOptions={{ header: () => null }} >
    <Tab.Screen name="home" component={Home} />
    <Tab.Screen name="contact" component={BlankScreen} />
  </Tab.Navigator>
);

const drawerExtraOptions = [{
  id: 'github',
  title: 'GitHub',
  onPress: () => Linking.openURL('https://github.com/AlanSaracho'),
}];

export const Screens = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Tabs" extraOptions={drawerExtraOptions} >
      <Drawer.Screen component={Tabs} name="Tabs"/>
      <Drawer.Screen component={BlankScreen} name="Dos"/>
      <Drawer.Screen component={BlankScreen} name="Tres"/>
    </Drawer.Navigator>
  </NavigationContainer>
);
