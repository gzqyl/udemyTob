import { StyleSheet, useColorScheme } from "react-native";

function GeneQRStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({
        container: {
          flex: 1
        },
        btnBox:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: 10
        },
        btn:{
            maxWidth: 220
        }
        
    });
}

export default GeneQRStyle