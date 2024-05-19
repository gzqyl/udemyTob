import React, { useCallback, useEffect, useState } from 'react'
import { ImageRequireSource, Linking } from 'react-native'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import CenterTipWithBtnUI from '../../common/CenterTipWithBtnUI'
import { useAppDispatch } from "../../../redux/hooks";
import { displayNavHeader, hideNavHeader } from "../../../redux/reducer/qrReducer";
import { useTranslation } from 'react-i18next'


function ScanQRPermissionUI({ navigation }: any): JSX.Element {

  const { t } = useTranslation()

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')
  const dispatch = useAppDispatch()

  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission()
    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }

  useEffect(() => {
    if (cameraPermissionStatus === 'granted') navigation.replace('ScanQR')
  }, [cameraPermissionStatus, navigation])

  useEffect(()=>{

    dispatch(displayNavHeader())

  },[])

  useEffect(()=>{

    return ()=>{
      dispatch(hideNavHeader())
    }

  },[])

  return (
    <CenterTipWithBtnUI tip={t("scan qrcode needs camera permission")} btnTitle={t("Grant")} action={()=>requestCameraPermission()} />
  )
}

export default ScanQRPermissionUI

