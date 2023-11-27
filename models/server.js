const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            buscarPath: '/api/buscar',
            productoPath: '/api/producto',
            loginPath: '/api/auth',
            usuariosPath: '/api/usuarios',
            categoriasPath: '/api/categorias',
        }

        this.conectarDB();

        this.configureCors();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbconnection();
    }

    configureCors() {
        const allowedOrigins = ['http://192.168.68.130']; // Replace with your allowed origins
        const corsOptions = {
            origin: (origin, callback) => {
                if (allowedOrigins.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
        };
        this.app.use(cors(corsOptions));

        this.app.use(express.json())
    }

// carpetas estaticas
    middlewares(){
        // this.app.use(cors());
        
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.paths.loginPath, require('../routes/auth'));
        this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
        this.app.use(this.paths.productoPath, require('../routes/producto'));
        this.app.use(this.paths.buscarPath, require('../routes/buscar'));
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })   
    }
}

module.exports = Server;