import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Animated,  Easing, Platform, StatusBar} from "react-native";
import { Camera, Code, CodeType, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import NoCameraErrorView from "../../common/NoCameraErrorView";
import { Icon, Text } from "@rneui/themed";
import QrCodeStyle from "../../../styles/qrcode/qrcodestyle";
import { useIsFocused } from '@react-navigation/core'
import useIsForeground from "../../../hooks/useIsForground";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useCameraPermission from "../../../hooks/useCameraPermission";
import { launchImageLibrary } from "react-native-image-picker";
import { toast } from "@backpackapp-io/react-native-toast";
import RNQRGenerator from 'rn-qr-generator';
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { useTranslation } from "react-i18next";

//'material' | 'material-community' | 'simple-line-icon' | 'zocial' | 'font-awesome' | 'octicon' | 'ionicon' | 'foundation' | 'evilicon' | 'entypo' | 'antdesign' | 'font-awesome-5' | string;

function ScanQRUI({parent_nav,nav}:{parent_nav:NativeStackNavigationProp<any, string, undefined>, nav: NativeStackNavigationProp<any, string, undefined>}): JSX.Element{

    const [torch, setTorch] = useState(false)
    const [active,setActive] = useState(true)
    const isPermitted = useCameraPermission()

    let animation = new Animated.Value(-60)

    const styles = QrCodeStyle()
    const { t } = useTranslation()
    let device = useCameraDevice('back')
    const isFocused = useIsFocused()
    const isForeground = useIsForeground()
    const isActive = isFocused && isForeground

    const jumpToRes = (tp:string,val:string[]) => {

        nav.navigate("ScanQRRes",{
            tp,
            val
        })
    }

    const onCodeScanned = useCallback((codes: Code[]) => {
        // console.log(`Scanned ${codes.length} codes:`, codes)
        const value = codes[0]?.value
        if (value == null) return
        jumpToRes(codes[0].type, [value])

    }, [])

    const codeTT =  `'code-128'
                    | 'code-39'
                    | 'code-93'
                    | 'ean-13'
                    | 'ean-8'
                    | 'itf'
                    | 'upc-e'
                    | 'qr'
                    | 'pdf-417'
                    | 'aztec'
                    | 'data-matrix'`

    const codeTTArr = codeTT.split('|').map(codeValue=>codeValue.trim().replaceAll(`'`,''))
    
    const codeScanner = useCodeScanner({
        codeTypes: codeTTArr as CodeType[],
        onCodeScanned: onCodeScanned
    })

    const scanAni =  Animated.loop(
        Animated.timing(animation, {
            toValue: 155,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true
        })
    )

    if(isActive){
        scanAni.start()
    }

    useEffect(() => {
       
       return ()=>{
            scanAni.stop()
       }
       
    }, [])

    useEffect(()=>{

        if(!isPermitted){
            nav.replace("ScanQRPermission")
        }

    },[isPermitted])
  

    const selectImage = async ()=> {

        const resImg = await launchImageLibrary({
            mediaType: 'photo'
        });

        const firstAsset = resImg.assets?.[0].uri

        if(firstAsset == null || typeof firstAsset == 'undefined'){
            toast.error(t("Image can not be recognized"));
            return
        }

        const smallImg = await ImageResizer.createResizedImage(
            firstAsset,
            320,
            320,
            "JPEG",
            100,
            0,
            undefined
        )

        const decodeRes = await RNQRGenerator.detect({
            uri: smallImg.uri
        })

        if(decodeRes.values.length == 0){
            toast.error(t("Image can not be recognized"));
            return
        }

        jumpToRes(decodeRes.type, decodeRes.values)

    }

    if(device == null){
        return (<NoCameraErrorView />)
    }

    if(Platform.OS == "android"){

        setTimeout(()=>{
            setActive(false)
        },10)

        if(active){
            return (<></>)
        }
        
    }

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                audio={false}
                video={false}
                isActive={isActive}
                codeScanner={codeScanner}
                frameProcessor={undefined}
                torch={torch ? 'on' : 'off'}
            />
            <SafeAreaView style={{flex:1}}>
                <View style={{display:'flex', flex:1, flexDirection:'column',justifyContent:'space-between'}}>
                    <View style={styles.lightBox}>
                        <Icon 
                            name='chevron-with-circle-left'
                            onPress={()=>parent_nav.goBack()}
                            type='entypo'
                            iconStyle={styles.backIcon}
                        />
                        <Icon 
                            name={torch ? 'flashlight' : 'flashlight-off'}
                            onPress={()=>setTorch(!torch)}
                            type='material-community'
                            iconStyle={styles.lightIcon}
                        />
                    </View>

                    <View style={styles.verticalBox}>

                        <View style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                            <Animated.View
                                style={{
                                    transform: [
                                        {
                                            translateY: animation
                                        }
                                    ],
                                    backgroundColor: 'white',
                                    width: 100,
                                    height: 5,
                                }}
                            />

                        </View>
                        {/* <Icon 
                            name='scan-outline'
                            type='ionicon'
                            iconStyle={styles.scanIcon}
                            size={220}
                            allowFontScaling={false}
                            adjustsFontSizeToFit={false}
                            maxFontSizeMultiplier={1}
                        /> */}
                    </View>
                   
                    
                   
                   <View style={styles.verticalBox}>
                        <TouchableOpacity onPress={()=>selectImage()}>
                            <View style={styles.imgBox}>
                                <Icon 
                                    name='images'
                                    iconStyle={{color:'orange'}}
                                    type='font-awesome-5'
                                />
                            </View>
                            <View style={styles.txtBox}>
                                <Text style={styles.smalltxt}>{t("Select From Photos")}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            {Platform.OS == "android" && (<StatusBar hidden={true} />)}
        </View>
    );

}

function withScanQRUI({parent_nav,nav}:{parent_nav:NativeStackNavigationProp<any, string, undefined>, nav: NativeStackNavigationProp<any, string, undefined>}): JSX.Element{
    return <ScanQRUI nav={nav} parent_nav={parent_nav} />
}

export default withScanQRUI;