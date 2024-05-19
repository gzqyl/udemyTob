import { StyleSheet, useColorScheme } from "react-native";

function OCRStyle(){
    const isDarkMode = useColorScheme() == "dark"
    return StyleSheet.create({
        container: {
          flex: 1
        },
        lightBox:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        lightIcon:{
            marginTop: 30,
            marginRight: 15,
            color: 'white'
        },
        backIcon:{
            marginTop: 30,
            marginLeft: 15,
            color: 'white'
        },
        imgBox:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10
        },
        txtBox:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30
        },
        verticalBox:{
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        smalltxt:{
            fontSize:10,
            color: 'orange'
        },
        scanIcon:{
            color: 'white'
        },
        resTitle:{
            fontWeight: 'bold'
        },
        resBtnBox:{
            display:'flex',
            flexDirection: 'row',
            marginTop:10,
            marginBottom:5,
            justifyContent: 'flex-end'
        },
        resCopy:{
            color: '#1097f2',
        },
        resLink:{
            color: '#1097f2',
            marginLeft: 15
        },
        photoIconBox:{
            display:'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        photoIcon:{
            marginTop: 30,
            marginRight: 15,
            color: 'white'
        }
    });
}

export default OCRStyle