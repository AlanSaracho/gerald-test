import { map, size } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import { snapPoint } from "react-native-redash";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DrawerMenuOption = {
  id: string;
  title: string;
  onPress: () => void;
}

type Props = {
  open: boolean;
  children: React.ReactNode;
  options: Array<DrawerMenuOption>;
  extraOptions: Array<DrawerMenuOption>;
  selected: string;
  onChange: (open: boolean) => void;
}

const borderRadius = 32;
const margin = 32;
const menuWidth = 220;

const { height: screenHeight } = Dimensions.get('window');

export const DrawerMenu = ({ open, children, options, extraOptions, selected, onChange }: Props) => {
  const insets = useSafeAreaInsets();
  const heightTranslation = insets.top + margin / 2;

  const start = useSharedValue(0);
  const offset = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      start.value = offset.value;
    })
    .onUpdate((e) => {
      offset.value = e.translationX + start.value;
    })
    .onEnd((e) => {
      const finalPoint = snapPoint(e.translationX + start.value, e.velocityX, [0, menuWidth]);
      const isOpen = finalPoint === menuWidth;
      offset.value = withTiming(finalPoint);
      runOnJS(onChange)(isOpen);
    });

  useEffect(() => {
    offset.value = withTiming(open ? menuWidth : 0);
  }, [Math.random()]);

  const transition = useDerivedValue(() => interpolate(offset.value, [0, menuWidth], [0, 1], Extrapolate.CLAMP));

  const containerStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(transition.value, [0, 1], [0, heightTranslation]) }],
  }), []);

  const pageStyles = useAnimatedStyle(() => ({
    borderRadius: interpolate(transition.value, [0, 1], [0, borderRadius]),
    transform: [
      { translateX: interpolate(transition.value, [0, 1], [0, menuWidth - margin]) },
      { translateY: interpolate(transition.value, [0, 1], [0, 16]) },
      { translateY: -(screenHeight / 2) },
      { rotate: `${interpolate(transition.value, [0, 1], [0, -8])}deg` },
      { translateY: (screenHeight / 2) },
    ],
  }), []);

  const renderOptions = useCallback((list: DrawerMenuOption[]) => map(list, option => (
    <TouchableOpacity
      onPress={option.onPress}
      key={option.id}
      style={[styles.item, option.id === selected && styles.selectedItem ]}
    >
      <Text style={[styles.itemText, option.id === selected && styles.selectedItemText]}>
        {option.title}
      </Text>
    </TouchableOpacity>
  )), [selected])

  return (
    <Animated.View style={[styles.container, containerStyles]}>
      <Animated.View style={styles.drawer}>
        <View style={styles.menu}>
          <Text style={styles.title}>Beka</Text>
          {renderOptions(options)}
          {size(extraOptions) > 0 && <View style={styles.separator} />}
          {renderOptions(extraOptions)}
        </View>
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View collapsable={false} style={[styles.page, pageStyles]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#131030',
    borderTopLeftRadius: borderRadius,
  },
  menu: {
    width: menuWidth - margin,
    flex: 1,
    paddingTop: 64,
  },
  page: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 32,
  },
  item: {
    borderRadius: 8,
    paddingLeft: 32, 
    paddingVertical: 16,
    alignSelf: 'stretch',
    marginLeft: 16,
  },
  selectedItem: {
    backgroundColor: '#322533',
  },
  selectedItemText: {
    color: '#db7f85',
  },
  itemText: {
    color:'white',
    fontSize: 18,
  },
  separator: {
    height: 1, 
    alignSelf: 'stretch',
    backgroundColor: 'white',
    opacity: 0.5,
    marginVertical: 32,
    marginLeft: 16,
  },
});