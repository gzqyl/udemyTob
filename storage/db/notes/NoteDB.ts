import DBLite from "../db";

class NoteDB extends DBLite{

    constructor(){
        super("notes.sqlite")
    }

}

export default NoteDB