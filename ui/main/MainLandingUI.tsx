import React, { useEffect, useState, useContext, useCallback } from "react";
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

function MainLandingUI({navigation}: {navigation: any}): JSX.Element {

  const [data, setData] = useState<MainItemType[]>([]);

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

  const updateData = async (data: MainItemType[])=>{

    setData(data)
    await MainItemsData.updateData(data)

  }

  return (
      <>
        <DraggableFlatList
          data={data}
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