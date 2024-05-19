import { StyleSheet, useColorScheme } from "react-native";

function NoteStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({

        listTitle:{
            fontWeight: 'bold'
        },
        subTitle:{
            marginTop: 8
        },
        btnBox:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: 10
        },
        editBtn:{
            marginHorizontal:15
        },
        doneBtn:{
            marginHorizontal:15
        }
      
    });
}

export default NoteStyle