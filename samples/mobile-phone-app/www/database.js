function getopenDB() {
    try {
        if (window.openDatabase) {
            return window.openDatabase;   
        } else {
            alert('No HTML5 Support');
            return undefined;
        }
    } catch (e) {
        return undefined;   
    }
}

function prepareTable() {
    var openDB = getopenDB();
    if (!openDB){
        return;
    }
    db = openDB('mydatabase','1.0','my db',2*1024*1024);
    sqlQuery = 'CREATE TABLE IF NOT EXISTS appData (someText TEXT, trueFalse TEXT, color TEXT);';
    db.transaction(function(t) {
       t.executeSql(sqlQuery,[],null,null); 
    });
    return db;
}

function getDB() {
    return prepareTable();
}

