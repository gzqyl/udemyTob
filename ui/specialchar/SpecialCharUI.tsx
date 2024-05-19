import { Input, Text } from "@rneui/themed";
import React, { createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";
import SpecialStyle from "../../styles/specialstyle";
import SpecialKeyBoard from "./SpecialKeyBoard";


function SpecialCharUI(): JSX.Element{

    const [ctn,setCtn] = useState<string>("")

    const { t } = useTranslation()

    const styles = SpecialStyle()

    return (<>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>QQ</Text>
        </ScrollView>
        <SpecialKeyBoard />
    </>)

}

export default SpecialCharUI;