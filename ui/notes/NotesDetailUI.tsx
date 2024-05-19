import React, { FC, createContext, createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Input, Text } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Keyboard, ScrollView, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { toast } from "@backpackapp-io/react-native-toast";
import NoteTable from "../../storage/db/notes/NoteTable";
import NoteStyle from "../../styles/notes/notestyle";
import { IconType } from "../../structdata/IconType";
import Clipboard from "@react-native-clipboard/clipboard";
import { Input as BaseInputType } from '@rneui/base'

function NotesDetailUI({route,navigation}: NativeStackScreenProps<any>): JSX.Element{

    const [edit,setEdit] = useState<boolean>(false)
    const [ctn,setCtn] = useState<string>("")

    const { t } = useTranslation()
    const styles = NoteStyle()

    const hashId = route.params!.hashId

    const inputRef = createRef<TextInput & BaseInputType>()

    const getDetail = useCallback(async () => {
       
        const detail = await NoteTable.getItemByHashId(hashId)
        setCtn(detail)

    },[])

    useEffect(()=>{
        
        //inside effect, we should use callback, to avoid execute twice...
        getDetail()

    },[])

    const copyText = useCallback(()=>{

        Clipboard.setString(ctn);
        toast.success(t("Copied"))

    },[])

    const startEdit = ()=>{

        setEdit(true)
        
        setTimeout(()=>inputRef.current?.focus(), 100)

    }

    const startDone = async ()=>{

        await NoteTable.updateItem(hashId,ctn)
        setEdit(false)

    }
    
    const height = Dimensions.get("window").height - 220 > 30 ? Dimensions.get("window").height - 220 : 80
  
    return (
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="never">
                <Input
                    ref={inputRef}
                    editable={edit}
                    onEndEditing={()=>Keyboard.dismiss()}
                    inputContainerStyle={{borderBottomWidth: edit ? 1 : 0}}
                    multiline={true}
                    onChangeText={text => setCtn(text)}
                    value={ctn}
                    style={{marginTop:20, height:height}}
                />
                <View style={styles.btnBox}>
                    <Icon name="content-copy" type="material" style={{marginRight:10}} iconStyle={{color:'orange'}} size={30} onPress={()=>copyText()} />
                    {!edit && (<Icon name="edit" type="antdesign" style={styles.editBtn} iconStyle={{color:'#0081f1'}} size={30} onPress={()=>startEdit()} />)}
                    {edit && (<Icon name="checkmark-done" type="ionicon" style={styles.editBtn} iconStyle={{color:'#0081f1'}} size={30} onPress={()=>startDone()} />)}
                </View>
            </ScrollView>
        )

}

export default NotesDetailUI;