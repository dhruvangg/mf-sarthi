const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    
const db = require('./models');
const port = 8080;
const app = express()

const corsOptions = { origin: '*', methood: ['GET', 'POST', 'PUT', 'DELETE'] }
app.use(cors(corsOptions))
app.use(bodyParser.json())

db.sequelize.sync().then(() => console.log('Database Connected'))

app.get('/', (req, res) => res.send('Hello World'))

app.use('/clients', require('./routers/clients'))

app.listen(port, () => console.log('Server running at ' + port + 'port'))