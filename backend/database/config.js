import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const dbConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        });

        console.log('Base de datos MySQL conectada');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        throw new Error('Error en la conexión con la base de datos');
    }
};

export default dbConnection;
