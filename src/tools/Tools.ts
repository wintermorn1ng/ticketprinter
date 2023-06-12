import { ToastAndroid } from "react-native";

export function UUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export const showToast = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };


export const showToastLong = (text: string) => {
    ToastAndroid.show(text, ToastAndroid.LONG);
  };