import DBLite from "../db";

class FileTransferDB extends DBLite{

    constructor(){
        super("filetransfer.sqlite")
    }

}

export default FileTransferDB