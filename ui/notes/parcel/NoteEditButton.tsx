import React, { createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import HeaderRightIcon from "../../common/HeaderRightIcon";

function NoteEditButton({props,action}: {props: HeaderButtonProps, action: Function}): JSX.Element{

  const { t } = useTranslation()

  return (<HeaderRightIcon btnProps={props} tp="antdesign" name="edit" action={action} />)


}

export default NoteEditButton;