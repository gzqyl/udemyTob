import SQLite, { WebsqlDatabase } from '@gzqyl/react-native-sqlite-3'

type DBColumnType = string | number | Blob

class DBLite{

    db: WebsqlDatabase

    constructor(dbName: string){
        this.db = SQLite.openDatabase(dbName, "1.0", dbName, 1024);
    }

    query(sql: string,arr: DBColumnType[]): Promise<any[]>{

        return new Promise(resolve=>{

            this.db._db.exec([{sql: sql, args: arr}], false, (_,res)=>{

                let _res: any[] = []
                
                for (let i = 0; i < (res?.[0].rows?.length ?? 0); ++i) {
                    const rowData = res?.[0].rows?.[i] ?? false
                    if(rowData){
                        _res.push(rowData)
                    }
                }
                resolve(_res)
                
            })
            
        })
       
    }

    execute(sql: string,arr: DBColumnType[]): Promise<boolean>{

        return new Promise(resolve=>{

            this.db._db.exec([{sql: sql, args: arr}], false, (_,_res)=>{
                
                resolve(true)
               
            })

        })
        
    }


}

export default DBLite