import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/themed";

function CenterTipWithBtnUI({tip, btnTitle, action}:{ tip: string, btnTitle: string, action: Function}): JSX.Element{

  return (
      <View style={{display:'flex', flex:1, flexDirection:'column',justifyContent:'center'}}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Text>{tip}</Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Button title={btnTitle} onPress={()=>action()} style={{marginTop:20}} titleStyle={{marginHorizontal:15}}></Button>
        </View>
      </View>
  );

}

export default CenterTipWithBtnUI;