import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "@rneui/themed";

function CenterScreenTipText({tip}:{ tip: string}): JSX.Element{

  return (
      <View style={{display:'flex',flex: 1, flexDirection:'column',justifyContent:'center'}}>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Text>{tip}</Text>
        </View>
      </View>
  );

}

export default CenterScreenTipText;