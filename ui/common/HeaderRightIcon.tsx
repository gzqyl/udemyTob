import React, { useState } from "react";
import { Icon, Text } from "@rneui/themed";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { IconType } from "../../structdata/IconType";

function HeaderRightIcon({name,tp, btnProps,action}:{ name: string,tp: IconType, btnProps: HeaderButtonProps, action: Function}): JSX.Element{
  return (
    <Icon 
        name={name}
        onPress={()=>action()}
        type={tp}
        iconStyle={{color: btnProps.tintColor ?? "#1097f2"}}
    />
  );

}

export default HeaderRightIcon;