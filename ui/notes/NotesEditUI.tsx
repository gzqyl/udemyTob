import React, { createContext, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { NoteEditRefType } from "../../structdata/NoteRefType";
import { Input, Text } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { toast } from "@backpackapp-io/react-native-toast";
import NoteTable from "../../storage/db/notes/NoteTable";

const NotesEditUI = forwardRef<NoteEditRefType,NativeStackScreenProps<any>>(({navigation},ref)=>{

    const [ctn,setCtn] = useState<string>("")

    const { t } = useTranslation()

    useImperativeHandle(ref, ()=> {

        return {
            async complete(){

                const noteText = ctn.trim()
                if (noteText.replace(/\s+/g,'') == '') {
                    toast.error(t("Notes could not be empty."))
                    return
                }

                await NoteTable.addItem(noteText)

                navigation.goBack()

            }
        }

    })

   
  
    return (<View style={{marginHorizontal:10}}>
                <Input
                    editable={true}
                    multiline={true}
                    onChangeText={text => setCtn(text)}
                    value={ctn}
                    placeholder={t("Add note text here...")}
                    style={{marginTop:10, height:220}}
                />
            </View>)

})

export default NotesEditUI;