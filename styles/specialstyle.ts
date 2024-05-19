import { StyleSheet, useColorScheme } from "react-native";

function SpecialStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({
        containerA: {
            flex: 1,
            paddingTop: 60,
            padding: 16,
            backgroundColor: '#fff',
        },
        keyboardBox:{
            position: 'absolute',
            bottom: 0,
            height: 220,
            backgroundColor: '#C9CCD3',
            borderRadius: 10
        }
    });
}

export default SpecialStyle