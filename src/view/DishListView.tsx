import React, { useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { DishesManager } from "../model/DishesManager"
import { Dish } from "../model/Dish"
import { Button, Header, Text } from "@rneui/themed"
import { RES } from "./Resource"
import Icon from "react-native-vector-icons/AntDesign"

type DishListViewProp = {
    dishsManager: DishesManager
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
            <Button title={RES.edit}></Button>
            <Button title={RES.delete} onPress={() => prop.deleteHandler(prop.dish.id)}></Button>
        </View>
    )
}

export const DishListView = (prop: DishListViewProp) => {
    let [list, setList] = useState(prop.dishsManager.getDishes());
    const deleteHandler = (id: string) => {
        console.log(id);
        prop.dishsManager.removeDish(id);
        setList(prop.dishsManager.getDishes());
    }
    return (
        <View>
            <Header rightComponent={
                <Icon name="plus" size={25} color="white"></Icon>
            }></Header>
            <FlatList style={styles.container} data={list} renderItem={({ item }) => (
                <DishListItem dish={item} deleteHandler={id => deleteHandler(id)}></DishListItem>
            )}
            />
        </View>
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