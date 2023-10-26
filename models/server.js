const express = require('express');
const cors = require('cors');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        this.configureCors();
        this.middlewares();
        this.routes();
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
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${this.port}`);
        })   
    }
}

module.exports = Server;