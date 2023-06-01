import React from "react"
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native"
import { DishesManager } from "../model/DishesManager"

type DishListViewProp = {
    dishsManager: DishesManager
}

export const DishListView = (prop: DishListViewProp) => {
    return (
        <View>
            <FlatList data={prop.dishsManager.getDishes()} renderItem={({ item }) => (
                <Text style={styles.item}>name: {item.name}</Text>
            )}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});