import { StyleSheet, useColorScheme, Dimensions } from "react-native";

function MainStyle(){
    const isDarkMode = useColorScheme() == "dark"
    const width = Dimensions.get("window").width
    const iconDim = width <= 320 ? 25 : 35
    return StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
        },
        imageThumbnail: {
          width: iconDim,
          height: iconDim,
          resizeMode: 'contain',
        },
        textColor:{
          color: isDarkMode ? 'white' : 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          marginHorizontal: 10
        },
        imageBox:{
            width: iconDim,
            height: iconDim,
        },
        bgColor:{
          backgroundColor: isDarkMode ? 'black' : 'white',
        }
    });
}

export default MainStyle