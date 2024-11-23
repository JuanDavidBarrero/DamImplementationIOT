import { response, request } from 'express';
import dbConnection from '../database/config.js'; 

export const devicesGet = async (req = request, res = response) => {
    try {
        const connection = await dbConnection();  

        // Ejecutar la consulta para obtener los dispositivos y las dos últimas mediciones
        const [devices] = await connection.execute(`
            WITH RankedMeasurements AS (
                SELECT 
                    m.device_id, 
                    m.data AS measurement_data,
                    m.date AS measurement_date,
                    ROW_NUMBER() OVER (PARTITION BY m.device_id ORDER BY m.date DESC) AS rn
                FROM measurements m
            )
            SELECT 
                d.device_id, 
                d.name AS device_name, 
                d.location AS device_location,
                rm.measurement_data,
                rm.measurement_date
            FROM Devices d
            LEFT JOIN RankedMeasurements rm ON d.device_id = rm.device_id
            WHERE rm.rn <= 2
            ORDER BY d.device_id, rm.measurement_date DESC;
        `);

        await connection.end();

        return res.json(devices);
    } catch (error) {
        console.error('Error al obtener dispositivos:', error.message);
        return res.status(500).json({ message: 'Error al obtener los dispositivos' });
    }
};
