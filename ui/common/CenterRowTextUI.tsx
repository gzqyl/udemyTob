import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";

function CenterRowTextUI({ctn}:{ ctn: string}): JSX.Element{

  return (
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Text>{ctn}</Text>
        </View>
  );

}

export default CenterRowTextUI;