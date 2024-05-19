import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useTranslation } from "react-i18next";

function DataIsLoadingUI(): JSX.Element{

    const { t } = useTranslation()

    return (
        <View style={{display:'flex', flex:1, flexDirection:'column',justifyContent:'center'}}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <Text>{t("Loading...")}</Text>
            </View>
        </View>
    );

}

export default DataIsLoadingUI