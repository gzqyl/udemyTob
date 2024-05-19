import { StyleSheet, useColorScheme } from "react-native";

function TransferStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({
        pageBox:{
            display:'flex',
            flex: 1,
            justifyContent:'space-between'
        },
       imgBoxA:{
        flex: 2/5
       },
       imgBoxB:{
        flex: 2/5
       },
       btnBox:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1/5
       },
       centerBox:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center'
       },
       btnTextBox:{
        backgroundColor:'orange',
        width:100,
        height:100,
        borderRadius:50,
        justifyContent:'center',
        display:'flex'
       },
       btnText:{
        color: 'white',
        fontWeight: 'bold'
       },
       btnImageBox:{
        justifyContent:'center',
        display:'flex',
        flex: 1
       }
    });
}

export default TransferStyle