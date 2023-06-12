import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { DishesManager } from "../model/DishesManager"
import { Text, Header, Dialog, Input, Button } from "@rneui/themed"
import Icon from "react-native-vector-icons/AntDesign"
import { Dish } from "../model/Dish"
import { globleBluetooth } from "./BluetoothManageView"
import { BluetoothEscposPrinter, BluetoothManager } from "tp-react-native-bluetooth-printer"
import { showToast, showToastLong } from "../tools/Tools"
import { RES } from "./Resource"
type PrinterViewProps = {
    dishesManager: DishesManager
}

enum ALIGN {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
}

const print = async (dish: Dish, num: number) => {
    await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
    await BluetoothEscposPrinter.setBold(0);
    await BluetoothEscposPrinter.printText("面\n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
    });
    await BluetoothEscposPrinter.setBold(0);
    await BluetoothEscposPrinter.printText(`${num}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 2,
        heigthtimes: 2,
        fonttype: 1,
    });
    await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
    );

    await BluetoothEscposPrinter.printerAlign(ALIGN.LEFT);
    await BluetoothEscposPrinter.printText(dish.name + "\n\r", {
        encoding: "GBK",
        widthtimes: 1,
        heigthtimes: 1,
    });
    await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printerAlign(ALIGN.LEFT);
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );

    // --------------------------------------------------------------------------------------

    await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.setBold(0);
    await BluetoothEscposPrinter.printText("\n\r面\n\r", {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 0,
        heigthtimes: 0,
        fonttype: 1,
    });
    await BluetoothEscposPrinter.setBold(0);
    await BluetoothEscposPrinter.printText(`${num}\n\r`, {
        encoding: "GBK",
        codepage: 0,
        widthtimes: 2,
        heigthtimes: 2,
        fonttype: 1,
    });
    await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
    );

    await BluetoothEscposPrinter.printerAlign(ALIGN.LEFT);
    await BluetoothEscposPrinter.printText(dish.name + "\n\r", {
        encoding: "GBK",
        widthtimes: 1,
        heigthtimes: 1,
    });
    await BluetoothEscposPrinter.printText(
        "--------------------------------\n\r",
        {}
    );
    await BluetoothEscposPrinter.printerAlign(ALIGN.CENTER);
    await BluetoothEscposPrinter.printerAlign(ALIGN.LEFT);
    
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );
    await BluetoothEscposPrinter.printText(
        " \n\r",
        {}
    );

}

export const PrinterView = (prop: PrinterViewProps) => {
    useEffect(() => {
        (BluetoothManager.connect(globleBluetooth.address) as any).then(() => {
            showToastLong('打印机连接成功');
        }).catch(() => {
            showToastLong('打印机连接失败');
        });
    }, []);

    const [nowNumber, setNowNumber] = useState(1);
    const [dialogVisiable, setDialogVisiable] = useState(false);

    return (
        <>
            <Header rightComponent={
                <Icon name="plus" size={25} color="white" ></Icon>
            }></Header>
            <Text style={styles.centerText}>{'当前号码: ' + nowNumber}</Text>
            <Button title={"修改序号"} onPress={() => setDialogVisiable(true)}></Button>
            <View style={styles.flexContainer} >
                {
                    prop.dishesManager.getDishes().map((dish) => {
                        return (<TouchableOpacity key={dish.id} style={styles.item} onPress={() => print(dish, nowNumber).then(() => {
                            console.log('打印成功!');
                            setNowNumber(nowNumber + 1);
                        }).catch(e => {
                            showToast("打印失败，请检查蓝牙连接")
                        })}>
                            <Text style={styles.bigText}>
                                {dish.name}
                            </Text>
                        </TouchableOpacity>)
                    })
                }
            </View>
            <Dialog isVisible={dialogVisiable}>
            <Dialog.Title title={"修改序号"} />
                <Input onChangeText={text => setNowNumber(+text)} inputMode="numeric"></Input>
                <Dialog.Actions>
                    <Dialog.Button
                        title={RES.ok}
                        onPress={() => {
                            setDialogVisiable(false);
                        }}
                    />
                </Dialog.Actions>
            </Dialog>
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '30%',
        height: 100,
        backgroundColor: 'blue',
        justifyContent: 'center',
        margin: 5
    },
    flexContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    bigText: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white'
    },
    centerText: {
        textAlign: 'center',
        fontSize: 20
    }
})