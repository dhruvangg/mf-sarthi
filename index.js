const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    axios = require('axios'),
    path = require('path');
const { parseReportData, parseData } = require('./utils/parser');
const db = require('./models');
const { createClient, createClients, getClients } = require('./controllers/Client');

const port = 8080;
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

const NAV_URL = 'https://www.amfiindia.com/spages/NAVAll.txt'
app.get('/getAllNAV', async function (req, res) {
    axios.get(NAV_URL).then((response) => {
        const fundData = parseData(response.data);
        res.json(fundData);
    }).catch((error) => {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    });
})

// app.get('/:schemeCode', function (req, res) {
//     const url = 'https://www.amfiindia.com/spages/NAVAll.txt'

//     request(url, function (error, response, body) {
//         let fundData = parseData(body)

//         fundData = fundData.filter((fund) => {
//             if (fund['Scheme Code'] == req.params.schemeCode)
//                 return fund
//         })

//         res.json(fundData[0])
//     })
// })

app.listen(port, () => console.log('Server running at ' + port + 'port'))