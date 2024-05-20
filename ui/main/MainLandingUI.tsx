import React, { useEffect, useState, useContext, useCallback, forwardRef } from "react";
import { View, StatusBar, StyleSheet, FlatList, Text } from "react-native";
import DraggableFlatList, {
  ShadowDecorator,
  ScaleDecorator,
  RenderItemParams,
  OpacityDecorator,
  NestableScrollContainer, NestableDraggableFlatList
} from "react-native-draggable-flatlist";
import MainItemUI from "./MainItemUI";
import { type MainItemType } from "../../structdata/MainStruct";
import MainItemsData from "../../storage/MainItemsData";
import Config from "../../utils/config";
import MainStyle from "../../styles/main/mainstyle";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { testAddAsync } from "../../redux/reducer/testReducer";

function MainLandingUI({navigation}: {navigation: any}): JSX.Element {

  const [data, setData] = useState<MainItemType[]>([]);

  const testMsg = useAppSelector(state=> state.test)
  const testDispatch = useAppDispatch()

  const conf = useContext(Config.context)
  const styles = MainStyle()

  useEffect(()=>{
      (async ()=>{
        if(conf?.dev){
          console.log("---clear items data on dev ----")
          await MainItemsData.clearCache() //dev only
        }
        setData(await MainItemsData.getData())
      })()
  },[])

  useEffect(()=>{
      testDispatch(testAddAsync({
        id: 0,
        text: "from server",
        completed: true
      }))
  },[])

  const updateData = async (data: MainItemType[])=>{

    setData(data)
    await MainItemsData.updateData(data)

  }

  return (
      <>
        <Text>{testMsg.length > 0 ? testMsg[0].text : "Wait Api"}</Text>
        <DraggableFlatList
          data={data}
          onDragEnd={({data})=>updateData(data)}
          renderItem={({ item, getIndex, drag, isActive }:RenderItemParams<MainItemType> ) => (<>
            <ShadowDecorator>
              <ScaleDecorator>
                <OpacityDecorator>
                  <MainItemUI item={item} getIndex={getIndex} drag={drag} isActive={isActive} navigation={navigation} />
                </OpacityDecorator>
              </ScaleDecorator>
            </ShadowDecorator>
          </>)}
          //Setting the number of column
          // numColumns={4}
          // columnWrapperStyle={{flex: 1, justifyContent: "flex-start"}} 
          keyExtractor={(item) => `key-${item.rank}`}
        />
      </>
  );
}

export default MainLandingUI;