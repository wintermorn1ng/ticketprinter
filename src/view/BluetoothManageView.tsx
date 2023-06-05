import React, { useState } from "react"
import { FlatList, View } from "react-native";
import { BluetoothDevice, checkBluetooth, connectBluetooth, getDevicesList } from "../tools/BluetoothManager";
import { Text } from "@rneui/themed";
import { RES } from "./Resource";

const deviceSelectHandler = (address: string) => {
    connectBluetooth(address).catch((e: any) => console.log);
}

const renderDevicesItem = (item: BluetoothDevice) => {
    return (
        <View>
            <Text>{item.name}</Text>
            <Text>{item.address}</Text>
        </View>
    )
}

export const BluetoothManagerView = () => {
    let [pairedDevices, setPairedDevices] = useState([] as any);
    let [foundDevices, setFountDevices] = useState([] as any);
 
    getDevicesList().then((list) => {
        setPairedDevices(list.paired);
        setFountDevices(list.found);
    })

    return (
        <View>
            <Text>{RES.pairedDevicesList}</Text>
            <FlatList data={pairedDevices} renderItem={({item}) => renderDevicesItem(item)}/>
            <Text>{RES.foundDevicesList}</Text>
            <FlatList data={foundDevices} renderItem={({item}) => renderDevicesItem(item)}/>
        </View>
    )
}