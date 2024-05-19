/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme, NativeModules, StatusBar, Platform } from "react-native";
import { ThemeProvider, createTheme } from '@rneui/themed';
import Config from "./utils/config";
import MainUI from "./ui/MainUI";
import { Toasts } from "@backpackapp-io/react-native-toast";
import i18n from "./localization/i18n";
import App_Init from "./utils/ini_app";

//init the i18n instance...
i18n.init()
App_Init.init()

function App(): JSX.Element {

  const isDarkMode = useColorScheme() == "dark"

  const theme = createTheme({
    mode: isDarkMode ? 'dark' : 'light'
  });

  //this is require for Android, if it not works on IOS, we should specify platform here, considerating remove statusBar Component on IOS...
  const bgColor = isDarkMode ? 'black' : 'white'
  const fgColor = isDarkMode ? 'light-content' : 'dark-content'

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <Config.context.Provider value={Config.value}>
              <MainUI />
              {Platform.OS == "android" && (<StatusBar backgroundColor={bgColor} barStyle={fgColor} />)}
              <Toasts />
            </Config.context.Provider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

