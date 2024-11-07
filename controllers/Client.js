const db = require("../models");

exports.createClients = async (data) => {
    try {
        const clients = await db.Client.bulkCreate(data, {
            ignoreDuplicates: true,
            validate: true, // Ensures data validation before insertion
            returning: true // Only needed if you want to get the inserted records
        })
        console.log('Client', clients);
        return { "status": "ok", "message": "Created Client", data: clients }
    } catch (error) {
        return { "status": "error", "message": error }
    }
}

exports.createClient = async (req, res) => {
    const { name, pan } = req.body;
    try {
        const Client = await db.Client.create({
            name,
            pan
        })
        res.status(201).json({ "status": "ok", "message": "Created Client", data: Client })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getClients = async () => {
    try {
        const total = await db.Client.count()
        const clients = await db.Client.findAll()
        return { "status": "ok", "message": "Get Clients", clients, total }
    } catch (error) {
        console.log(error);

        return { "status": "error", "message": error }
    }
}