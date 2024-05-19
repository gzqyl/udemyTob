import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useTranslation } from "react-i18next";

function ListIsEmptyUI(): JSX.Element{

    const { t } = useTranslation()

    return (
        <View style={{display:'flex', flex:1, flexDirection:'column',justifyContent:'center'}}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <Text>{t("List is Empty.")}</Text>
            </View>
        </View>
    );

}

export default ListIsEmptyUI;