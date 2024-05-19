import { StyleSheet, useColorScheme } from "react-native";

function FileStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({
        pageBox:{
            display:'flex',
            flex: 1,
            justifyContent:'space-between'
        },
        listTitle:{
            fontWeight: 'bold'
        },
        subTitle:{
            marginTop: 8
        },
        emptyTip:{
            margin:15
        },
        tipTitle:{
            fontWeight: 'bold'
        },
        tipOpen:{
            fontWeight: 'bold',
            lineHeight: 25
        },
        tipAddr:{
            color: 'orange',
        }
    });
}

export default FileStyle