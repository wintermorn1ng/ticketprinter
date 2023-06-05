import {
    BluetoothManager,
    BluetoothEscposPrinter,
    BluetoothTscPrinter,
    BluetoothDevice,
    ScannedBluetoothDevices,
} from "tp-react-native-bluetooth-printer";

export type {BluetoothDevice};

export type DevicesList = ScannedBluetoothDevices;

export const checkBluetooth = () => {
    return BluetoothManager.isBluetoothEnabled();
}

export const getDevicesList = async (): Promise<DevicesList> => {
    let devicesListJSON: any = await BluetoothManager.scanDevices();
    return JSON.parse(devicesListJSON);
}

export const connectBluetooth = (address: string): any => {
    return BluetoothManager.connect(address) // the device address scanned.
}