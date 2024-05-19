import { Input, Text } from "@rneui/themed";
import React, { createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, TouchableOpacity, View } from "react-native";
import SpecialStyle from "../../styles/specialstyle";
import SpecialKeyPanel from "./SpecialKeyPanel";


function SpecialKeyBoard(): JSX.Element{

    const [ctn,setCtn] = useState<string>("")

    const { t } = useTranslation()
    const styles = SpecialStyle()

    return (<>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.keyboardBox}>
            
            <SpecialKeyPanel />

        </ScrollView>
    </>)

}

export default SpecialKeyBoard;