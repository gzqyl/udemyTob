import { Button, Image, Text } from "@rneui/themed";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View } from "react-native";
import TransferStyle from "../../styles/transferstyle";
import { launchImageLibrary } from "react-native-image-picker";
import { toast } from "@backpackapp-io/react-native-toast";
import RNFS from 'react-native-fs'
import _ from "underscore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


function StyleTransferUI({navigation}:NativeStackScreenProps<any>): JSX.Element{

    const [picA,setPicA] = useState<string>("")
    const [picB,setPicB] = useState<string>("")
    const [disableBtn,setDisableBtn] = useState(false)
    const [picAHeight,setPicAHeight] = useState<number>(0)
    const [picAWidth,setPicAWidth] = useState<number>(0)
    const [picBHeight,setPicBHeight] = useState<number>(0)
    const [picBWidth,setPicBWidth] = useState<number>(0)

    const { t } = useTranslation()

    const styles = TransferStyle()


    const selectA = async ()=>{

        const resImg = await launchImageLibrary({
            mediaType: 'photo'
        });

        const firstAsset = resImg.assets?.[0].uri

        if(firstAsset == null || typeof firstAsset == 'undefined'){
            return
        }

        setPicA(firstAsset)

    }

    const selectB = async ()=>{

        const resImg = await launchImageLibrary({
            mediaType: 'photo'
        });

        const firstAsset = resImg.assets?.[0].uri

        if(firstAsset == null || typeof firstAsset == 'undefined'){
            return
        }

        setPicB(firstAsset)

    }

    const startTransfer = async ()=>{

        setDisableBtn(true)

        const fileExistsA = await RNFS.exists(picA)
        const fileExistsB = await RNFS.exists(picB)
        if (!fileExistsA || !fileExistsB){
            toast.error(t("Image not selected!"))
            setDisableBtn(false)
            return
        }

        

        setDisableBtn(false)

    }

    return (<>
        <View style={styles.pageBox}>
            <View style={styles.imgBoxA}>
                <View style={{...styles.centerBox,marginTop:10}}>
                    <Text>Picture A</Text>
                </View>
                <View style={{display:'flex',justifyContent:'center',flex:1}}>
                    <View style={picA != "" ? {...styles.centerBox, flex: 1} : {...styles.centerBox}}>
                        {picA == "" && (<View style={styles.btnTextBox}>
                            <TouchableOpacity style={styles.centerBox} onPress={()=>selectA()}>
                                <Text style={styles.btnText}>Select A</Text>
                            </TouchableOpacity>
                        </View>)}
                        {picA != "" && (<View style={styles.btnImageBox} onLayout={(imgLayout)=>{
                            const {height,width} = imgLayout.nativeEvent.layout
                            const imgSize = _.min([height,width])
                            const fImgSize = imgSize > 30 ? imgSize - 15 : imgSize
                            setPicAHeight(fImgSize)
                            setPicAWidth(fImgSize)
                        }}>
                            <TouchableOpacity style={styles.centerBox} onPress={()=>selectA()}>
                                <Image source={{uri: picA}} resizeMode="contain" style={{width:picAWidth,height:picAHeight}} />
                            </TouchableOpacity>
                        </View>)}
                    </View>
                </View>
            </View>
            <View style={styles.imgBoxB}>
                <View style={styles.centerBox}>
                    <Text>Picture B</Text>
                </View>
                <View style={{display:'flex',justifyContent:'center',flex:1}}>
                <View style={picB != "" ? {...styles.centerBox, flex: 1} : {...styles.centerBox}}>
                        {picB == "" && (<View style={styles.btnTextBox}>
                            <TouchableOpacity style={styles.centerBox} onPress={()=>selectB()}>
                                <Text style={styles.btnText}>Select B</Text>
                            </TouchableOpacity>
                        </View>)}
                        {picB != "" && (<View style={styles.btnImageBox} onLayout={(imgLayout)=>{
                            const {height,width} = imgLayout.nativeEvent.layout
                            const imgSize = _.min([height,width])
                            const fImgSize = imgSize > 30 ? imgSize - 15 : imgSize
                            setPicBHeight(fImgSize)
                            setPicBWidth(fImgSize)
                        }}>
                            <TouchableOpacity style={styles.centerBox} onPress={()=>selectB()}>
                                <Image source={{uri: picB}} resizeMode="contain" style={{width:picBWidth,height:picBHeight}} />
                            </TouchableOpacity>
                        </View>)}
                    </View>
                </View>
            </View>
            <View style={styles.btnBox}>
                <Button disabled={disableBtn} style={{marginTop:10}} onPress={()=>startTransfer()}>{t("Transfer A Style To B")}</Button>
            </View>
        </View>
    </>)

}

export default StyleTransferUI;