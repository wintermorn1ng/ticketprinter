import React, { useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BluetoothDevice, checkBluetooth, connectBluetooth, getDevicesList } from "../tools/BluetoothManager";
import { Dialog, Header, Text } from "@rneui/themed";
import { RES } from "./Resource";
import Icon from "react-native-vector-icons/AntDesign"

export let globleBluetooth = {
    address: 'DC:1D:30:9C:03:7F'
}

const deviceSelectHandler = (address: string) => {
    connectBluetooth(address).then(() => {
        globleBluetooth.address = address;
    }).catch((e: any) => console.log);
}

const renderDevicesItem = (item: BluetoothDevice) => {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => deviceSelectHandler(item.address)}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{' ' + item.address}</Text>
        </TouchableOpacity>
    )
}

export const BluetoothManagerView = () => {
    const [pairedDevices, setPairedDevices] = useState([] as any);
    const [foundDevices, setFountDevices] = useState([] as any);

    const [loading, setLoading] = useState(false);

    const refresh = () => {
        setLoading(true);
        getDevicesList().then((list) => {
            setLoading(false);
            console.log(list.found);
            setPairedDevices(list.paired);
            setFountDevices(list.found);
        })
    }

    return (
        <>
            <SafeAreaView style={{flex: 1}}>
                <Header rightComponent={
                    <Icon name="reload1" size={25} color="white" onPress={refresh}></Icon>
                }></Header>
                <Text style={styles.title}>{RES.pairedDevicesList}</Text>
                <FlatList data={pairedDevices} renderItem={({ item }) => renderDevicesItem(item)} />
                <Text style={styles.title}>{RES.foundDevicesList}</Text>
                <FlatList data={foundDevices} renderItem={({ item }) => renderDevicesItem(item)} />
            </SafeAreaView>
            <Dialog isVisible={loading}>
                <Dialog.Loading />
                <Text>{RES.searchDevices}</Text>
            </Dialog>
        </>

    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        height: 40
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 20,
        marginTop: 10
    }
})