import express from 'express';
import cors from 'cors';

import deviceRouter from '../routes/devices.js'
import dbConnection from '../database/config.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.devicespath = '/api/devices';

        this.middlewares();
        this.routes();
        this.conectarDb();
    }

    async conectarDb() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }


    routes() {
        this.app.use(this.devicespath, deviceRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server run on the port ${this.port}`);
        });
    }
}

export default Server;
