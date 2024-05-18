/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  Linking,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import md5 from "md5"

function App(): React.JSX.Element {

  const [msg,setMsg] = useState<string>("")

  const isDarkMode = useColorScheme() === 'dark';

  const dataArr = new Array(10).fill(0)

  const openBaidu=()=>{
    Linking.openURL("https://www.baidu.com")
  }

  const backgroundStyle = {
    borderWidth: 1,
    borderColor: "red"
  };

  return (
    <SafeAreaView>
      <StatusBar hidden={false} />
      <View style={backgroundStyle}>

        <Text>Hello World {md5("app")}</Text>
        <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{width: 40, height: 40}} />
        <TextInput value={msg} onChangeText={(txt)=>{setMsg(txt)}}/>
        <Button title="Test Button" onPress={()=>openBaidu()} />
        <ScrollView>
          {dataArr.map((_,k) => <Text key={k}>QQ{k}</Text>)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default App;
