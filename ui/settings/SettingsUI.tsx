import { Card, Divider, Switch, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import SettingStyle from "../../styles/settingstyle";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { getMLKitLangCode, setMLKitLangCode } from "@gzqyl/react-native-userdefault";


function SettingsUI(): JSX.Element{
   
    const [zh,setZh] = useState<boolean>(false)
    const [ja,setJa] = useState<boolean>(false)
    const [ko,setKo] = useState<boolean>(false)
    const [en,setEn] = useState<boolean>(false)

    const styles = SettingStyle()
    const { t } = useTranslation()

    const initLangCode = useCallback(async ()=>{

      const localCode = await getMLKitLangCode()

      if (localCode == "zh") {
        setZh(true)
      }

      if (localCode == "ja") {
        setJa(true)
      }

      if (localCode == "ko") {
        setKo(true)
      }

      if (localCode == "en") {
        setEn(true)
      }

    },[])

    const setLangCode = async (langCode: string): Promise<void> =>{

      await setMLKitLangCode(langCode)

      const localCode = langCode
      
      if (localCode == "zh") {
        setZh(true)
        setJa(false)
        setKo(false)
        setEn(false)
      }

      if (localCode == "ja") {
        setZh(false)
        setJa(true)
        setKo(false)
        setEn(false)
      }

      if (localCode == "ko") {
        setZh(false)
        setJa(false)
        setKo(true)
        setEn(false)
      }

      if (localCode == "en") {
        setZh(false)
        setJa(false)
        setKo(false)
        setEn(true)
      }

    }

    useEffect(()=>{

      initLangCode()

    },[])

    const getCurLangText = (): string =>{

        if (zh) {
          return t("Chinese")
        } else if(en){
          return t("English")
        } else if(ja){
          return t("Janpanese")
        } else {
          return t("Korean")
        }

    }

    return (<ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.containBox}>
        <View style={styles.listTitleBox}>
          <Text style={styles.listTitle}>{t("MLKit OCR Language Setting")}</Text>
        </View>
        <View style={styles.listTitleBox}>
          <Text>{t("Current Language: ")}<Text style={{fontWeight:'bold'}}>{getCurLangText()}</Text></Text>
        </View>
        <View style={styles.switchBox}>
          <Text>{t("English")}</Text>
          <Switch
            value={en}
            disabled={en == true}
            onValueChange={(_value) => setLangCode("en")}
          />
        </View>
        <Divider />
        <View style={styles.switchBox}>
          <Text>{t("Chinese")}</Text>
          <Switch
            value={zh}
            disabled={zh == true}
            onValueChange={(_value) => setLangCode("zh")}
          />
        </View>
        <Divider />
        <View style={styles.switchBox}>
          <Text>{t("Janpanese")}</Text>
          <Switch
            value={ja}
            disabled={ja == true}
            onValueChange={(_value) => setLangCode("ja")}
          />
        </View>
        <Divider />
        <View style={styles.switchBox}>
          <Text>{t("Korean")}</Text>
          <Switch
            value={ko}
            disabled={ko == true}
            onValueChange={(_value) => setLangCode("ko")}
          />
        </View>
     </View>
  </ScrollView>)

}

export default SettingsUI;