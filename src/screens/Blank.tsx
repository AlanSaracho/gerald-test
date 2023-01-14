import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { sample } from 'lodash';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { DrawerParamList, HomeStackParamList } from '.';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<DrawerParamList, 'Tabs'>,
  NativeStackNavigationProp<HomeStackParamList>
>
type ScreenNames = 'Dos' | 'screen2';
const redirectScreens = ['Dos', 'screen2'];

export const BlankScreen = () => {
  const navigate = useNavigation<NavigationProp>();
  const [nextPage] = useState(sample(redirectScreens) as ScreenNames);

  const nav = () => {
    if(nextPage) {
        navigate.navigate(nextPage);
    }
  }

  return (
    <View style={styles.container}>
      <Text onPress={nav}>Go To {nextPage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
