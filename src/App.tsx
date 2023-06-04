import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DishListView } from './view/DishListView';
import { DishesManager } from './model/DishesManager';
import { ThemeProvider } from '@rneui/themed';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {

  const dishManager = new DishesManager();
  dishManager.addDish('dish1');
  dishManager.addDish('dish2');

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DishListView dishsManager={dishManager}></DishListView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
