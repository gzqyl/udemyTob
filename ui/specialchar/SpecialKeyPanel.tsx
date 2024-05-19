import { Input, Text } from "@rneui/themed";
import React, { createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import SpecialStyle from "../../styles/specialstyle";


function KeyBoardSingleView({data}: {data: string[]}): JSX.Element{

    const {width} = Dimensions.get("window")

    return (<>
    <View style={{width}}>
        <Text>QQ</Text>
    </View>
    </>)


}


function SpecialKeyPanel(): JSX.Element{


    const { t } = useTranslation()

    const styles = SpecialStyle()

    const data = new Array(3).fill(new Array(36).fill("c"))
    

    return (<>
    {data.map((v,k)=> <KeyBoardSingleView data={v} key={k} />)}
    </>)

}

export default SpecialKeyPanel;