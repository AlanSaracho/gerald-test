import { map, toUpper } from 'lodash';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import { DrawerMenu, DrawerMenuOption } from './components/DrawerMenu';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DrawerMenuNavigationOptions = {
  title?: string;
};

type TabNavigationEventMap = {};

type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  DrawerMenuNavigationOptions,
  TabNavigationEventMap
> & { extraOptions: DrawerMenuOption[]; }

export const  DrawerMenuNavigator: React.FC<Props> = ({
  initialRouteName,
  children,
  screenOptions,
  extraOptions,
}) => {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  const [open, setOpen] = useState(false);
  const selected = state.routes[state.index];
  const insets = useSafeAreaInsets();

  const options: DrawerMenuOption[] = map(state.routes, route => ({
    title: descriptors[route.key].options.title || route.name,
    id: route.key,
    onPress: () => {
      navigation.dispatch({
        ...TabActions.jumpTo(route.name),
        target: state.key,
      });
      setOpen(false);
    },
  }));

  return (
    <NavigationContent>
      <DrawerMenu
        selected={selected.key}
        options={options}
        extraOptions={extraOptions}
        open={open}
        onChange={setOpen}
      >
        <View style={[styles.header, { marginTop: insets.top }]}>
          <Ionicons style={styles.icon} onPress={() => setOpen(true)} name="menu-outline" size={32} color="gray" />
          <Text style={styles.title}>{toUpper(selected.name)}</Text>
        </View>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={[
                styles.container,
                { display: i === state.index ? 'flex' : 'none' },
              ]}
            >
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </DrawerMenu>
    </NavigationContent>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1
  },
  title: {
    marginLeft: 12,
    fontSize: 18,
    color: '#96969b',
    letterSpacing: 1.5,
  },
  icon: {
    color: '#96969b',
  },
});


export const createDrawerMenuNavigator = createNavigatorFactory(DrawerMenuNavigator);