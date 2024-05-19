import AsyncStorage from '@react-native-async-storage/async-storage';
import {type MainItemType } from '../structdata/MainStruct';
import AsyncStorageKeyDict from './AsyncStorageKeyDict';

class MainItemsData{

    skey = AsyncStorageKeyDict.mainItemData

    async updateData(data: MainItemType[]){

        await AsyncStorage.setItem(this.skey, JSON.stringify(data))

    }

    async getData(): Promise<MainItemType[]>{

        const dataSource = [
            {
                rank: 5,
                icon: require("../assets/main/scan.png"),
                name: 'Scan QRCode',
                route: 'ScanQRCode'
            },

            {
                rank: 1,
                icon: require("../assets/main/qrcode.png"),
                name: 'Text(urls) to QRCode',
                route: 'GeneQRCode'
            },

            {
                rank: 3,
                icon: require("../assets/main/ocr.png"),
                name: 'OCR (Image To Text)',
                route: 'OCR'
            },

            {
                rank: 4,
                icon: require("../assets/main/filetransfer.png"),
                name: 'File Transfer (Wifi - No USB)',
                route: 'FileTransfer'
            },

            {
                rank: 13,
                icon: require("../assets/main/styletransfer.png"),
                name: 'Simple Image Style Transfer',
                route: 'TransferStyle'
            },

            {
                rank: 21,
                icon: require("../assets/main/notes.png"),
                name: 'Simple Notes',
                route: 'Notes'
            },
            // {
            //   rank: 2,
            //   icon: require("../assets/main/txt-file.png"),
            //   name: '.txt File'
            // },

            // {
            //   rank: 2,
            //   icon: require("../assets/main/password.png"),
            //   name: 'Password Generator'
            // },

            // {
            //     rank: 9,
            //     icon: require("../assets/main/unicode.png"),
            //     name: 'Special Chars (Beyond Normal Text)',
            //     route: 'SpecialChar'
            // },

            // {
            //     rank: 11,
            //     icon: require("../assets/main/videoframe.png"),
            //     name: 'Get Video Frame Images'
            // },
           
        ]

        const data = await AsyncStorage.getItem(this.skey);

        if (data == null) {
            return dataSource
        }

        try{

            const parse_data = JSON.parse(data)
            return parse_data

        }catch(e){
            return dataSource
        }

    }

    //dev use only
    async clearCache(){

        await AsyncStorage.removeItem(this.skey)

    }



}

export default new MainItemsData