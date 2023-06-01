import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { DishListView } from './view/DishListView';
import { DishesManager } from './model/DishesManager';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const dishManager = new DishesManager();
  dishManager.addDish('dish1');
  dishManager.addDish('dish2');

  return (
    <SafeAreaView style={backgroundStyle}>
      <DishListView dishsManager={dishManager}></DishListView>
    </SafeAreaView>
  );
}

export default App;
