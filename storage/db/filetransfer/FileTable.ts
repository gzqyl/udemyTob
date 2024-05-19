import FileTransferDB from "./FileTransferDB";
import { FileItemType } from "../../../structdata/FileItemType";
import md5 from "md5"
import moment from "moment";
import _ from "underscore"

class _FileTable extends FileTransferDB {

    tableName: string = "filetable"

    async makesureTableIsThere(){

        const sql = `create table if not exists ${this.tableName}(hashId text, fname text, furl text, createTime text, rankTime integer)`
        await this.execute(sql,[])

    }

    async getItems(): Promise<FileItemType[]>{
        await this.makesureTableIsThere()
        const sql = `select hashId,fname,furl,rankTime from ${this.tableName} order by rankTime desc`
        const fatRes = await this.query(sql,[])
        const res: FileItemType[] = _.map(fatRes, v => {
            return {
                hashId: v.hashId,
                fname: v.fname,
                furl: v.furl,
                createTime: moment(v.rankTime).fromNow()
            }
        })
        return res
    }

    async addItem(fname: string, furl: string){

        await this.makesureTableIsThere()

        const hasId = md5(`noteid_hash_${Date.now()}_${Math.random()}`)
        const createTime = moment().fromNow()
        const rankTime = Math.floor(Date.now())

        const sql = `insert into ${this.tableName}(hashId,fname,furl,createTime,rankTime) values(:hashId,:fname,:furl,:createTime,:rankTime)`
        await this.execute(sql,[
            hasId,
            fname,
            furl,
            createTime,
            rankTime
        ])

    }

    async delItem(hashId: string){

        await this.makesureTableIsThere()
        const sql = `delete from ${this.tableName} where hashId = :hashId`
        await this.execute(sql,[
            hashId
        ])

    }


}

const FileTable = new _FileTable

export default FileTable