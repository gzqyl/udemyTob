import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, StatusBar, StyleSheet, FlatList, useColorScheme, ScrollView, Linking } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { Divider, Text } from "@rneui/themed";
import QrCodeStyle from "../../../styles/qrcode/qrcodestyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ToastPosition, toast } from "@backpackapp-io/react-native-toast";
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from "react-i18next";

function QRResParcel({item}: {item: string}): JSX.Element{

    const { t } = useTranslation();
    const styles = QrCodeStyle()
    const showOpen = item.startsWith("http")

    const openLink = async ()=>{

        if (await Linking.canOpenURL(item)){
            Linking.openURL(item)
        }

    }

    const copyItem = ()=>{

        Clipboard.setString(item);
        toast.success(t("Copied"))

    }

    return (<View>
        <Text>{item}</Text>
        <View style={styles.resBtnBox}>
            <TouchableOpacity onPress={()=>copyItem()}>
                <Text style={styles.resCopy}>{t("Copy")}</Text>
            </TouchableOpacity>
            {showOpen && (<TouchableOpacity onPress={()=>openLink()}>
                <Text style={styles.resLink}>{t("Open Link")}</Text>
            </TouchableOpacity>)}
        </View>
        <Divider style={{marginBottom:10}} />
    </View>)

}

function ScanQRResUI({route,navigation}: NativeStackScreenProps<any>): JSX.Element{

    //console.log(route.params)
    const { t } = useTranslation()
    const styles = QrCodeStyle()
    const items: string[] = route.params?.val ?? []
    const tp:string = route.params?.tp ?? t("unknown")

    return (
        <>
            <View style={{margin:10}}>
                <Text style={styles.resTitle}>{t("Code Type")}: {tp}</Text>
            </View>
            <ScrollView>
                <View style={{marginHorizontal:10}}>
                    {items.map((v,k)=> <QRResParcel key={k} item={v} />)}
                </View>
            </ScrollView>
        </>
    );

}

export default ScanQRResUI;