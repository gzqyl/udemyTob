import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { useCameraDevice } from "react-native-vision-camera";
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationContainerProps, NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import NoCameraErrorView from "../common/NoCameraErrorView";
import { useTranslation } from "react-i18next";

function OCRMainUI({navigation}:NativeStackScreenProps<any>): JSX.Element{

  return (
    <NoCameraErrorView />
  );

}

export default OCRMainUI;