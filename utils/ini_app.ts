import _ from 'underscore'
import { setMLKitLangCode, isLangSetted } from '@gzqyl/react-native-userdefault';
import RNFS from 'react-native-fs'

type MLKitLangCode = 'en' | 'ja' | 'ko' | 'zh'
//this class will execute init when app lauch, should perform any things that require initialization...
class _App_Init {

    init(){
    
        this.sortInit()

    }

    async sortInit(){
        await this.initMLKitLocalLang()
        await this.initTransferDir()
        await this.initTransferCacheDir()
    }

    async initMLKitLocalLang(){

        const langCode = "en"
        const isDone = await isLangSetted()
        if (isDone) {
            return
        }
        await setMLKitLangCode(langCode)

    }

    async initTransferDir(){

        //filetransfer
        const fdir = `${RNFS.DocumentDirectoryPath}/filetransfer`
        const fexist = await RNFS.exists(fdir)
        if (!fexist) {
            await RNFS.mkdir(fdir)
        }

    }

    //it is a trick to clean cache dir, so app will save much disk space...
    async initTransferCacheDir(){

        //tranfercachedir
        const fdir = `${RNFS.DocumentDirectoryPath}/tranfercachedir`
        const fexist = await RNFS.exists(fdir)
        if (fexist) {
            await RNFS.unlink(fdir)
        }
        await RNFS.mkdir(fdir)

    }

    private getLangCode(code: string): MLKitLangCode{

        if (!_.contains(['en','ja','ko','zh'],code)) {
            return 'en'
        }else{
            return code as MLKitLangCode
        }

    }

}

const App_Init = new _App_Init

export default App_Init