import { response, request } from 'express';
import dbConnection from '../database/config.js'; 

export const devicesGet = async (req = request, res = response) => {
    try {
        const connection = await dbConnection();  

        // Ejecutar la consulta para obtener los dispositivos y las dos últimas mediciones
        const [devices] = await connection.execute(`SELECT device_id, name, location FROM Devices;`);

        await connection.end();

        return res.json(devices);
    } catch (error) {
        console.error('Error al obtener dispositivos:', error.message);
        return res.status(500).json({ message: 'Error al obtener los dispositivos' });
    }
};


export const devicesPost = async (req = request, res = response) => {
    const { deviceName, location } = req.body;

    if (!deviceName || !location) {
        return res.status(400).json({ message: "Los campos deviceName y location son obligatorios." });
    }

    try {
        const connection = await dbConnection();

        // Iniciar una transacción
        await connection.beginTransaction();

        // Crear un registro en Valves y obtener el ID generado
        const [valveResult] = await connection.execute(
            `INSERT INTO Valves (name) VALUES (?)`,
            [`valve${deviceName}`]
        );
        const valveId = valveResult.insertId;

        // Insertar el dispositivo en la tabla Devices usando el valveId generado
        const [deviceResult] = await connection.execute(
            `INSERT INTO Devices (name, location, valve_id) VALUES (?, ?, ?)`,
            [deviceName, location, valveId]
        );

        const deviceId = deviceResult.insertId;

        // Confirmar la transacción
        await connection.commit();
        await connection.end();

        return res.status(201).json({ 
            message: "Dispositivo y válvula creados correctamente.",
            response: {
                deviceId,
                deviceName,
                location,
                valveId
            }
        });
    } catch (error) {
        console.error("Error al agregar el dispositivo y la válvula:", error.message);

        try {
            // Revertir la transacción en caso de error
            const connection = await dbConnection();
            await connection.rollback();
            await connection.end();
        } catch (rollbackError) {
            console.error("Error al hacer rollback:", rollbackError.message);
        }

        return res.status(500).json({ message: "Error al agregar el dispositivo y la válvula." });
    }
};
