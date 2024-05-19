import { StyleSheet, useColorScheme } from "react-native";

function SettingStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({
        container: {
          flex: 1
        },
        fonts:{
            fontSize:12
        },
        containBox:{
            margin: 15
        },
        listTitleBox:{
            display: 'flex',
            flexDirection:'row',
            justifyContent:'flex-start',
            marginBottom:10
        },
        listTitle:{
            fontWeight: 'bold'
        },
        switchBox:{
            display: 'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            marginVertical:10
        }
    });
}

export default SettingStyle