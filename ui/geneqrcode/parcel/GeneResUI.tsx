import { NativeStackNavigationProp, NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "@backpackapp-io/react-native-toast";
import { StyleSheet, View } from "react-native";
import { Image, Text } from "@rneui/themed";

function GeneResUI({route,navigation}: NativeStackScreenProps<any>): JSX.Element{

  const { t } = useTranslation()
  const qr_uri = useAppSelector(state => state.geneqr.qr_uri)

  if (qr_uri == ""){
    toast.error(t("It seems something is wrong."))
    return (<></>)
  }

  return (<>
    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:15}}>
      <Image source={{uri: `${qr_uri}`}} containerStyle={{aspectRatio: 1, height: 280}} />
    </View>
  </>)


}

export default GeneResUI;