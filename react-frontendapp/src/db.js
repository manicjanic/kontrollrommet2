import PouchDB from 'pouchdb'

export default class DB {
    constructor(name) {
        this.db = new PouchDB(name);

    }

    async getAllPacovs() {
        let allPacovs = await this.db.allDocs({ include_docs: true })
        let pacovs = {};
        allPacovs.rows.forEach(item => pacovs[item.id] = item.doc )
        return pacovs
    }
}