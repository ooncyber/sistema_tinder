var mysql = require('mysql');

class Db {
    constructor() {
        this.con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }
    execSql(SQL, params, callback) {
        this.con.query(SQL, params, (error, results, fields) => {
            if (error) throw error;
            callback(JSON.parse(JSON.stringify(results)));
        });

    }

    iniciarConexao() {
        this.con.connect();
    }

    pararConexao() {
        this.con.end();
    }



    deletarTabelas() {





    }

    criarTabelas() {

        console.log("Tabelas criadas \n\n");

    }


}
module.exports = new Db();