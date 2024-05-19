import React, { createContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from "react-i18next";
import GeneQRStyle from "../../styles/geneqr/geneqrstyle";
import { Button, Input } from "@rneui/themed";
import { View } from "react-native";
import RNQRGenerator from "rn-qr-generator";
import { toast } from "@backpackapp-io/react-native-toast";
import { useAppDispatch } from "../../redux/hooks";
import { updateQrURI } from "../../redux/reducer/geneqrReducer";

function GeneQRCodeUI({navigation}: NativeStackScreenProps<any>): JSX.Element{
  
  const [txt,setTxt] = useState<string>("")
  const styles = GeneQRStyle()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const geneQR = ()=>{

    const ctn = txt.replace(/\s+/g, '')

    if (ctn == ""){
      toast.error(t("Qrcode content could not be empty."))
      return
    }

    // navigation.navigate("GeneQRRes", {
    //   ctn
    // })

    RNQRGenerator.generate({
      value: ctn,
      height: 300,
      width: 300,
      correctionLevel: 'M'
    })
    .then(response => {
      const { uri } = response;
      dispatch(updateQrURI(uri))
      navigation.navigate("GeneQRRes")
    })
    .catch(error => toast.error(String(error)))

  }

  return (
   <>
    <Input
        editable={true}
        multiline={true}
        onChangeText={text => setTxt(text)}
        value={txt}
        placeholder={t("Input any text or urls here to generate QRCode...")}
        style={{marginTop:10, height:150}}
    />
    <View style={styles.btnBox}>
        <Button title={t("Generate QRCode")} style={styles.btn} onPress={()=> geneQR()} />
    </View>
   </>
  );

}

export default GeneQRCodeUI;