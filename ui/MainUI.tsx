import React, { useRef } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from "../redux/hooks";
import { useTranslation } from "react-i18next";
import MainLandingUI from "./main/MainLandingUI";
import ScanQRCodeUI from "./scanqrcode/ScanQRCodeUI";
import GeneQRCodeUI from "./geneqrcode/GeneQRCodeUI";
import GeneResUI from "./geneqrcode/parcel/GeneResUI";
import QRDownloadBtn from "./geneqrcode/parcel/QRDownloadBtn";
import OCRMainUI from "./ocr/OCRMainUI";
import NotesUI from "./notes/NotesUI";
import NoteEditButton from "./notes/parcel/NoteEditButton";
import { NoteEditRefType, NoteRefType } from "../structdata/NoteRefType";
import NotesEditUI from "./notes/NotesEditUI";
import NoteDoneButton from "./notes/parcel/NoteDoneButton";
import NotesDetailUI from "./notes/NotesDetailUI";
import SettingButton from "./settings/SettingButton";
import SettingsUI from "./settings/SettingsUI";
import StyleTransferUI from "./styletransfer/StyleTransferUI";
import FileTransferUI from "./filetransfer/FileTransferUI";

function MainUI(): JSX.Element {

  const showQRHeader = useAppSelector(state => state.qrcode.nav_header)
  const showOCRHeader = useAppSelector(state => state.ocr.nav_header)

  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const { t } = useTranslation();
  
  const noteRef = useRef<NoteRefType | null>(null)
  const noteEditRef = useRef<NoteEditRefType | null>(null)
  const NoteUI = (props: NativeStackScreenProps<any>)=>(<NotesUI ref={noteRef} {...props} />)
  const NoteEditUI = (props: NativeStackScreenProps<any>) => (<NotesEditUI ref={noteEditRef} {...props} />)

  return (
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="MainLanding">
          <Stack.Screen name="MainLanding" component={MainLandingUI} options={({navigation}:NativeStackScreenProps<any>)=>{
            return {title:t("Tob - Tool Boxes"), headerRight: (props)=>(<SettingButton props={props} navigation={navigation} />)}
          }} />
          <Stack.Screen name="ScanQRCode" component={ScanQRCodeUI} options={{title:t("Scan - Recognize QRCode"), headerBackTitle: t("Back"), headerShown: showQRHeader}} />
          <Stack.Screen name="GeneQRCode" component={GeneQRCodeUI} options={{title:t("Generate QRCode"), headerBackTitle: t("Back")}} />
          <Stack.Screen name="GeneQRRes" component={GeneResUI} options={{title:t("Generated QRCode"),headerBackTitle: t("Back"), headerRight: (props)=>(<QRDownloadBtn props={props} />)}} />
          <Stack.Screen name="OCR" component={OCRMainUI} options={{title:t("OCR - Recognize Text"), headerBackTitle: t("Back"), headerShown: showOCRHeader}} />
          <Stack.Screen name="Notes" component={NoteUI} options={{title:t("Simple Notes"), headerBackTitle: t("Back"), headerRight: (props)=>(<NoteEditButton props={props} action={()=> noteRef.current?.editNote()} />)}} />
          <Stack.Screen name="NotesEdit" component={NoteEditUI} options={{title:t("Add Notes"), headerBackTitle: t("Back"), headerRight: (props)=>(<NoteDoneButton props={props} action={()=> noteEditRef.current?.complete()} />)}} />
          <Stack.Screen name="NotesDetail" component={NotesDetailUI} options={{title:t("Notes Detail"), headerBackTitle: t("Back"), gestureEnabled: false}} />
          <Stack.Screen name="Settings" component={SettingsUI} options={{title:t("Settings"), headerBackTitle: t("Back")}} />
          <Stack.Screen name="TransferStyle" component={StyleTransferUI} options={{title:t("Style Transfer"), headerBackTitle: t("Back")}} />
          <Stack.Screen name="FileTransfer" component={FileTransferUI} options={{title:t("Quick File Transfer"), headerBackTitle: t("Back")}} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default MainUI;