/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
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
  Button,
  Animated,
  Dimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import md5 from "md5"
import {getMLKitLangCode, setMLKitLangCode} from '@gzqyl/react-native-userdefault'

function App(): React.JSX.Element {

  const [msg,setMsg] = useState<string>("")

  const [langCode,setlangCode] = useState<string>("")

  const isDarkMode = useColorScheme() === 'dark';

  const dataArr = new Array(10).fill(0)


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const posAnim =  useRef(new Animated.ValueXY()).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const windowSize = Dimensions.get("window")

  console.log(windowSize)

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    Animated.timing(posAnim, {
      toValue: {x: 100, y: 200},
      duration: 5000,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim, {
      toValue: 3,
      duration: 5000,
      useNativeDriver: true,
    }).start();

  };

  const getLang = async () =>{

      const code = await getMLKitLangCode()

      setlangCode(code)

  }

  useEffect(()=>{

    
    getLang()

  },[])
  
  

  const openBaidu= async ()=>{
    //Linking.openURL("https://www.baidu.com")

    await setMLKitLangCode("test lang code")

  }

  const backgroundStyle = {
    borderWidth: 1,
    borderColor: "red"
  };

  return (
    <SafeAreaView>
      <StatusBar hidden={false} />
      <View style={backgroundStyle}>

        <Text style={{color: isDarkMode ? 'white': 'red'}}>Dark Mode</Text>
        <View style={styles.boxStyle}>
          <Text>Hello {langCode}</Text>
          <Text> {md5("app")}</Text>
        </View>
        <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{width: 40, height: 40}} />
        <TextInput value={msg} onChangeText={(txt)=>{setMsg(txt)}}/>
        <Button title="Test Button" onPress={()=>openBaidu()} />
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
              transform: [{translateX:posAnim.x},{translateY: posAnim.y},{scaleX: scaleAnim},{scaleY: scaleAnim}]
            },
          ]}>
          <Text style={styles.fadingText}>Fading View!</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
        </View>
        <ScrollView>
          {dataArr.map((_,k) => <Text key={k}>QQ{k}</Text>)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  w10: {
    width: 100
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  boxStyle:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:15,
    marginRight:15
  }

})

export default App;
