import React, { useState } from "react";
import { View } from "react-native";
import { Icon } from "@rneui/themed";
import { IconType } from "../../structdata/IconType";

type FloatButtonProps = {
    iconName: string
    iconType: IconType
    action: Function
}

function FloatButton({iconName,iconType,action}: FloatButtonProps): JSX.Element{

  return (
        <View style={{position: 'absolute', bottom: 30, right: 30}}>
            <Icon
                name={iconName}
                type={iconType}
                onPress={()=>action()}
                size={30}
            />
        </View>
  );

}

export default FloatButton;