import React, { createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HeaderButtonProps, NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import HeaderRightIcon from "../common/HeaderRightIcon";
import { useColorScheme } from "react-native";


function SettingButton({props,navigation}: {props: HeaderButtonProps, navigation: NativeStackNavigationProp<any, string, undefined>}): JSX.Element{

  const { t } = useTranslation()

  const scheme = useColorScheme();

  const tintColor = scheme == "dark" ? "white" : "black"

  return (<HeaderRightIcon btnProps={{...props, tintColor}} tp="antdesign" name="setting" action={()=>{
    navigation.navigate("Settings")
  }} />)

}

export default SettingButton;