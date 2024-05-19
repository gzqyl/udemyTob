import React, { createContext, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { NoteRefType } from "../../structdata/NoteRefType";
import { NoteItemType } from "../../structdata/NoteItemType";
import NoteItem from "./parcel/NotesItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import NoteTable from "../../storage/db/notes/NoteTable";
import _ from "underscore"
import ListIsEmptyUI from "../common/ListIsEmptyUI";
import DataIsLoadingUI from "../common/DataIsLoadingUI";

const NotesUI = forwardRef<NoteRefType,NativeStackScreenProps<any>>(({navigation},ref)=>{

    const [data,setData] = useState<NoteItemType[]>([])
    const [loading,setLoading] = useState<boolean>(true)

    const { t } = useTranslation()

    useImperativeHandle(ref, ()=> {

        return {
            editNote(){
                navigation.navigate("NotesEdit")
            }
        }

    })

    const refreshData = async () => {
       
        const noteItems = await NoteTable.getItems()
        setData(noteItems)
        setLoading(false)

    }

    useEffect(()=>{

        navigation.addListener('focus',refreshData)

    },[])

    useEffect(()=>{

       return ()=>{
            navigation.removeListener('focus',refreshData)
       }

    },[])

    const delByHashId = async (hashId: string) => {
     
        // const indexKey = _.findIndex(data,item=> item.hashId == hashId)

        await NoteTable.delItem(hashId)
        await refreshData()

    }

    const navToDetail = (hashId: string) => {

        navigation.navigate("NotesDetail",{
            hashId
        })

    }

    if (loading){
        return (<></>)
    }

    if (data.length == 0){
        return (<ListIsEmptyUI />)
    }
  
    return (<>
      <FlatList
          data={data}
          renderItem={it=> (<NoteItem item={it.item} delByHashId={delByHashId} navToDetail={navToDetail} />)}
      />
  </>)

})

export default NotesUI;