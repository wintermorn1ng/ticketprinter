import React, { useContext, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Dish } from "../model/Dish"
import { Button, CheckBox, Dialog, Header, Input, Text } from "@rneui/themed"
import { RES } from "./Resource"
import Icon from "react-native-vector-icons/AntDesign"
import { getStringData, storeStringData } from "../tools/AsyncStorage"
import { DISHS_KEY } from "../App"
import { DishesManager } from "../model/DishesManager"

type DishListViewProp = {
    dishesManager: DishesManager,
    updateDishesManager: (newDishesManager: DishesManager) => void;
}

type DishListItemProp = {
    dish: Dish;
    deleteHandler: (id: string) => void;
}

const DishListItem = (prop: DishListItemProp) => {
    return (
        <View style={styles.flexRow}>
            <Text style={styles.item}>{prop.dish.name}</Text>
            <Text style={styles.item}>{prop.dish.prices}</Text>
            <Button title={RES.delete} onPress={() => prop.deleteHandler(prop.dish.id)}></Button>
        </View>
    )
}

export const DishListView = (prop: DishListViewProp) => {
    const [list, setList] = useState(prop.dishesManager.getDishes());
    const [addDialogVisiable, setAddDialogVisiable] = useState(false);

    const [dishName, setDishName] = useState('');
    const [dishPrices, setDishPrices] = useState(0);

    const updateStorage = (data: string) => {
        storeStringData(DISHS_KEY, data);
    }

    const updateStates = () => {
        setList(prop.dishesManager.getDishes());
        prop.updateDishesManager(prop.dishesManager);
    }

    const deleteHandler = (id: string) => {
        console.log(id);
        prop.dishesManager.removeDish(id);

        updateStates();
        updateStorage(prop.dishesManager.toJSON());
    }
    return (
        <>
            <View>
                <Header rightComponent={
                    <Icon name="plus" size={25} color="white" onPress={() => setAddDialogVisiable(true)}></Icon>
                }></Header>
                <FlatList style={styles.container} data={list} renderItem={({ item }) => (
                    <DishListItem dish={item} deleteHandler={id => deleteHandler(id)}></DishListItem>
                )}
                />
            </View>
            <Dialog
                isVisible={addDialogVisiable}
            >
                <Dialog.Title title={RES.addDishs} />
                <Text>{RES.dishName + ':'}</Text>
                <Input onChangeText={setDishName}></Input>
                <Text>{RES.dishPrices}</Text>
                <Input onChangeText={text => setDishPrices(+text)} inputMode="numeric"></Input>
                <Dialog.Actions>
                    <Dialog.Button
                        title={RES.ok}
                        onPress={() => {
                            if (dishName) {
                                prop.dishesManager.addDish(dishName, dishPrices);
                                updateStorage(prop.dishesManager.toJSON());
                                updateStates();
                            }
                            setAddDialogVisiable(false);
                        }}
                    />
                    <Dialog.Button title={RES.cancel} onPress={() => setAddDialogVisiable(false)} />
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});