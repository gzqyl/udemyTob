import { Icon, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import FileStyle from "../../styles/filestyle";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList } from "react-native-gesture-handler";
import { FileItemType } from "../../structdata/FileItemType";
import FileTable from "../../storage/db/filetransfer/FileTable";
import RNFS from 'react-native-fs'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setAppPort, setIpAddr, setIsWait, setIsWifi, setStarted } from "../../redux/reducer/transferReducer";
import Share from 'react-native-share'
import { toast } from "@backpackapp-io/react-native-toast";

type SeverStatus = 'online' | 'offline'
type FileItemInfo = {
    fname: string
    furl: string
}

function FileTransferUI({navigation}:NativeStackScreenProps<any>): JSX.Element{

    const {t} = useTranslation()

    return (<>
        <View style={{margin:15}}>
            <Text>{t("Example...")}</Text>
        </View>
    </>)

}

export default FileTransferUI;