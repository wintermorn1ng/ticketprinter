import React, { useEffect, useReducer, useState } from 'react'

import { DishListView } from './view/DishListView';
import { DishesManager } from './model/DishesManager';
import { Tab, TabView, Text, ThemeProvider } from '@rneui/themed';
import { BluetoothManagerView } from './view/BluetoothManageView';
import { PrinterView } from './view/PrinterView';
import { RES } from './view/Resource';
import { getStringData } from './tools/AsyncStorage';

export const DISHS_KEY = "Dishs";


function App(): JSX.Element {
  const [dishesManager, setDishesManager] = useState(new DishesManager());
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [index, setIndex] = React.useState(0);
  getStringData(DISHS_KEY).then(data => {
    if (data) {
      setDishesManager(DishesManager.fromJSON(data));
    }
  })
  const updateDishesManager = (newDishesManager: DishesManager) => {
    setDishesManager(newDishesManager);
    forceUpdate();
  }
  return (
    <>
      <TabView value={index} disableSwipe={true} disableTransition={true}>
        <TabView.Item style={{ width: '100%' }}>
          <PrinterView dishesManager={dishesManager}></PrinterView>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <DishListView dishesManager={dishesManager} updateDishesManager={(newDishesManager) => updateDishesManager(newDishesManager)}></DishListView>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
        </TabView.Item>
      </TabView>

      <Tab
        value={index}
        onChange={(e) => {
          console.log(e)
          setIndex(e)
          forceUpdate()
        }}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title={RES.print}
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title={RES.dishManage}
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
        {/* <Tab.Item
          title={RES.bluetooth}
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        /> */}
      </Tab>
    </>
  );
}

export default App;
