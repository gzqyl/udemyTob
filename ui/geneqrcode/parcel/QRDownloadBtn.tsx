import React, { createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hooks";
import { toast } from "@backpackapp-io/react-native-toast";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import HeaderRightIcon from "../../common/HeaderRightIcon";
import RNFS from "react-native-fs"
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

function QRDownloadBtn({props}: {props: HeaderButtonProps}): JSX.Element{

  const { t } = useTranslation()
  const qr_uri = useAppSelector(state => state.geneqr.qr_uri)

  const downloadQR = useCallback(async ()=>{
    
    if (qr_uri == ""){
        toast.error(t("It seems something is wrong."))
        return
    }
    const fileExists = await RNFS.exists(qr_uri)
    if(!fileExists){
        toast.error(t("It seems something is wrong."))
        return
    }

    await CameraRoll.save(qr_uri)

    toast.success(t("Saved Into Photos"))


  },[])

  return (<HeaderRightIcon btnProps={props} tp="ionicon" name="download-outline" action={()=> downloadQR()} />)


}

export default QRDownloadBtn;