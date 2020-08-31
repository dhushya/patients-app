import PouchDB from 'pouchdb';

class PouchDBFunctions {
    async sync() {
        var localDB = new PouchDB('patients');
        var remoteDB = new PouchDB('http://dhushyanth:pratheek@192.168.1.226:5984/patients');
        try {
            console.log("entering try catch")
            var response = await localDB.sync(remoteDB);
            console.log(response);
            console.log("replicate successful");
            return response;
        }
        catch (e) {
            console.log("wtf error");
            console.log(e);
            console.log("did you see the error");
            return e;
        }

        // var  response = await localDB.sync(remoteDB, {
        //   live: true,
        //   retry: true
        // }).on('change', function () {
        //   console.log("changes");
        // }).on('paused', function () {
        //   console.log("paused");
        // }).on('error', function () {
        //   console.log("error");
        // });
        // return (response);
    }
    async getDocs() {
        var local = new PouchDB('patients');
        try {
            var response = await local.allDocs({ include_docs: true });
            return (response.rows);
        } catch (e) {
            console.log(e);
            return ([]);
        }

    }
    async store(name: string, uhid: string, diagnosis: string, type: string, ward: string, procedure: string, amount: number, payment: string, status: string) {
        var currentdate = new Date();
        try {
            var local = new PouchDB('patients');
            var doc = {
                "_id": currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds(),
                "name": name,
                "UHID": uhid,
                "diagnosis": diagnosis,
                "patient_type": type,
                "ward_no": ward,
                "procedure": procedure,
                "amount": amount,
                "payment": payment,
                "status": status
            };
            console.log(doc);
            var response = await local.put(doc);
            return response;
        } catch (e) {
            return e;
        }
    }
}

export { PouchDBFunctions };