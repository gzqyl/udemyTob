import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useCameraDevice } from "react-native-vision-camera";
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationContainerProps, NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import NoCameraErrorView from "../common/NoCameraErrorView";
import ScanQRPermissionUI from "./parcel/ScanQRPermissionUI";
import withScanQRUI from "./parcel/ScanQRUI";
import ScanQRResUI from "./parcel/ScanQRResUI";
import { useTranslation } from "react-i18next";

function ScanQRCodeUI({navigation}:NativeStackScreenProps<any>): JSX.Element{

  const { t } = useTranslation()

  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const parent_nav = navigation

  const QRUI = ({navigation}:NativeStackScreenProps<any>): JSX.Element => {
    return withScanQRUI({
      parent_nav,
      nav: navigation
    })
  }

  const device = useCameraDevice('back')
  if (device == null) return <NoCameraErrorView />

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme} independent={true}>
      <Stack.Navigator initialRouteName="ScanQR">
        <Stack.Screen name="ScanQR" component={QRUI} options={{headerShown: false}} />
        <Stack.Screen name="ScanQRRes" component={ScanQRResUI} options={{title:t("Scan - Result"), headerBackTitle: t("Back")}} />
        <Stack.Screen name="ScanQRPermission" component={ScanQRPermissionUI} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default ScanQRCodeUI;