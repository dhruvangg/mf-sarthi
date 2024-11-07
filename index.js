const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path');
const { parseReportData } = require('./services/parser');
const db = require('./models');
const { createClient, createClients, getClients } = require('./controllers/Client');

const port = 3000;
const app = express()

const corsOptions = {
    origin: '*',
    methood: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOptions))
app.use(bodyParser.json())

db.sequelize.sync().then(() => console.log('Database Connected'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/getClients', async (req, res) => {
    const fileData = await parseReportData()
    const clientsData = fileData.flat()
    const uniqueClientsData = Array.from(new Map(clientsData.map(item => [item.pan, item])).values());
    const data = await createClients(uniqueClientsData)
    res.json(data)
})
app.get('/showClients', async (req, res) => {
    const data = await getClients()
    res.json(data)
})

app.listen(port, () => console.log('Server running at ' + port + 'port'))