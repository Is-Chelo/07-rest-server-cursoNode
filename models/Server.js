const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Conectar a la base de datos
        this.conectartDB();

        // middlewares
        this.middlewares();

        // rutas de la aplicacion
        this.routes();
    }


    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public')); 

    }

    async conectartDB(){
        await dbConnection()
    }


    listen() {
        this.app.listen(this.port)
    }

}



module.exports = Server