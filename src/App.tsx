import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DishListView } from './view/DishListView';
import { DishesManager } from './model/DishesManager';
import { ThemeProvider } from '@rneui/themed';
import { BluetoothManagerView } from './view/BluetoothManageView';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const DishesView = () => {
  const dishManager = new DishesManager();
  dishManager.addDish('dish1');
  dishManager.addDish('dish2');
  return (<>
    <DishListView dishsManager={dishManager}></DishListView>
  </>)
}

function App(): JSX.Element {
  return (
    // <SafeAreaProvider>
    //   <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={DishesView} />
            <Tab.Screen name="Settings" component={BluetoothManagerView} />
          </Tab.Navigator>
        </NavigationContainer>
    //   </ThemeProvider>
    // </SafeAreaProvider>
  );
}

export default App;
