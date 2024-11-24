import { response, request } from 'express';
import dbConnection from '../database/config.js';

export const devicesGet = async (req = request, res = response) => {
    try {
        const connection = await dbConnection();


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


        await connection.beginTransaction();


        const [valveResult] = await connection.execute(
            `INSERT INTO Valves (name) VALUES (?)`,
            [`valve${deviceName}`]
        );
        const valveId = valveResult.insertId;


        const [deviceResult] = await connection.execute(
            `INSERT INTO Devices (name, location, valve_id) VALUES (?, ?, ?)`,
            [deviceName, location, valveId]
        );

        const deviceId = deviceResult.insertId;


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

            const connection = await dbConnection();
            await connection.rollback();
            await connection.end();
        } catch (rollbackError) {
            console.error("Error al hacer rollback:", rollbackError.message);
        }

        return res.status(500).json({ message: "Error al agregar el dispositivo y la válvula." });
    }
};


export const postDeviceSwitch = async (req = request, res = response) => {
    const { id } = req.params;
    const { state } = req.body;


    if (state !== 'open' && state !== 'close') {
        return res.status(400).json({ message: 'Invalid valve state. Use "open" or "close".' });
    }

    let connection;
    try {

        connection = await dbConnection();


        const [device] = await connection.execute('SELECT valve_id FROM Devices WHERE device_id = ?', [id]);


        if (device.length === 0) {
            return res.status(404).json({ message: 'Device not found' });
        }


        const valve_id = device[0].valve_id;


        await connection.execute('INSERT INTO Logs (logs, valve_id) VALUES (?, ?)', [state, valve_id]);


        return res.status(200).json({ message: `Valve ${state} logged successfully.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    } finally {

        if (connection) {
            await connection.end();
        }
    }
};

export const getDeviceData = async (req = request, res = response) => {
    const { id } = req.params;
    const { unique } = req.query;

    let connection;
    try {

        connection = await dbConnection();


        const limitQuery = unique === '1' ? 'LIMIT 1' : '';


        const [deviceData] = await connection.execute(`
            SELECT 
                d.name, 
                d.location, 
                m.data, 
                m.date
            FROM Devices d
            LEFT JOIN measurements m ON d.device_id = m.device_id
            WHERE d.device_id = ?
            ${limitQuery}`, [id]);


        if (deviceData.length === 0) {
            return res.status(404).json({ message: 'Device not found or no measurements available.' });
        }


        return res.status(200).json(deviceData);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    } finally {

        if (connection) {
            await connection.end();
        }
    }
};

