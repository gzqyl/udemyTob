import NoteDB from "./NoteDB";
import { NoteItemType } from "../../../structdata/NoteItemType";
import md5 from "md5"
import moment from "moment";
import _ from "underscore"

class _NoteTable extends NoteDB {

    tableName: string = "note"

    async makesureTableIsThere(){

        const sql = `create table if not exists note(hashId text, title text, ctn text, createTime text, rankTime integer)`
        await this.execute(sql,[])

    }

    async getItems(): Promise<NoteItemType[]>{
        await this.makesureTableIsThere()
        const sql = "select hashId,title,rankTime from note order by rankTime desc"
        const fatRes = await this.query(sql,[])
        const res: NoteItemType[] = _.map(fatRes, v => {
            return {
                hashId: v.hashId,
                title: v.title,
                createTime: moment(v.rankTime).fromNow()
            }
        })
        return res
    }

    async getItemByHashId(hashId: string): Promise<string>{
        await this.makesureTableIsThere()
        const sql = "select ctn from note where hashId = :hashId"
        const fatRes = await this.query(sql,[hashId])
        return fatRes[0].ctn
    }

    async addItem(ctn: string){

        await this.makesureTableIsThere()

        const hasId = md5(`noteid_hash_${Date.now()}_${Math.random()}`)
        const title = ctn.slice(0,20) + "..."
        const createTime = moment().fromNow()
        const rankTime = Math.floor(Date.now())

        const sql = "insert into note(hashId,title,ctn,createTime,rankTime) values(:hashId,:title,:ctn,:createTime,:rankTime)"
        await this.execute(sql,[
            hasId,
            title,
            ctn,
            createTime,
            rankTime
        ])

    }

    async updateItem(hashId: string, ctn: string){

        await this.makesureTableIsThere()

        const title = ctn.slice(0,15)
        const createTime = moment().fromNow()
        const rankTime = Math.floor(Date.now())

        const sql = "update note set title=:title,ctn=:ctn,createTime=:createTime,rankTime=:rankTime where hashId=:hashId"
        await this.execute(sql,[
            title,
            ctn,
            createTime,
            rankTime,
            hashId
        ])

    }

    async delItem(hashId: string){

        await this.makesureTableIsThere()

        const sql = "delete from note where hashId = :hashId"
        await this.execute(sql,[
            hashId
        ])

    }


}

const NoteTable = new _NoteTable

export default NoteTable