const db = require("../models");
const redisClient = require("../utils/redis");

const cacheKey = 'getClients';
exports.createClients = async (data) => {
    try {
        const clients = await db.Client.bulkCreate(data, {
            ignoreDuplicates: true,
            validate: true, // Ensures data validation before insertion
            returning: true // Only needed if you want to get the inserted records
        })
        redisClient.del(cacheKey)
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
        redisClient.del(cacheKey)
        res.status(201).json({ "status": "ok", "message": "Created Client", data: Client })
    } catch (error) {
        res.status(400).json({ "status": "error", "message": error })
    }
}

exports.getClients = async () => {
    let clients;

    try {
        // Check if data exists in Redis cache
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            const { total, clients } = JSON.parse(cachedData);
            return { "status": "ok", "message": "Get Clients from Cache", clients, total }
        }

        const total = await db.Client.count()
        const clients = await db.Client.findAll()
        await redisClient.set(cacheKey, JSON.stringify({ total, clients }))
        // await redisClient.setEx(cacheKey, 3600, JSON.stringify({ total, clients }));
        return { "status": "ok", "message": "Get Clients", clients, total }
    } catch (error) {
        return { "status": "error", "message": error }
    }
}