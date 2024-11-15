const express = require('express');
const ExcelReader = require('../Services/ExcelReader');
const ExcelDataMapper = require('../Services/ExcelDataMapper');
const db = require('../models');
const router = express.Router()

const MASTER_DIR = 'data/master';
const excelReader = new ExcelReader(MASTER_DIR);

const COLUMNS_MAP = {
    name: ['Investor Name'],
    pan: ['PAN Number'],
    email: ['Email'],
    mobile: ['Mobile Number'],
    birthdate: ['Date of Birth'],
    birthdate: ['Date of Birth'],
    address_1: ['Address #1'],
    address_2: ['Address #2'],
    address_3: ['Address #3'],
    city: ['City'],
    pincode: ['Pincode'],
    state: ['State']
}

router.get('/read_master', async (req, res) => {
    try {
        excelReader.loadFiles();
        const allSheetNames = excelReader.getAllSheetNames();
        const excelMapper = new ExcelDataMapper(excelReader, COLUMNS_MAP, 1, 2);
        const data = allSheetNames.map(({ fileName, sheetNames }) => {
            return excelMapper.mapDataToJson(fileName, sheetNames[0]);
        })
        const clientsData = data.flat()
        const clients = await db.Client.bulkCreate(clientsData, {
            ignoreDuplicates: true,
            validate: true,
            returning: true
        })
        return res.status(201).json({ message: 'Clients created successfully.', data: clients, });
    } catch (error) {
        return res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message, details: error.errors, }, });
    }
})
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const { rows: clients, count: totalClients } = await db.Client.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']], 
        });
        return res.status(200).json({ message: 'Clients retrieved successfully.', data: { clients, total: totalClients, page, limit, }, });
    } catch (error) {
        return res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message, details: error.errors, }, });
    }
})

module.exports = router