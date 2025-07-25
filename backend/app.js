const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const initDatabase = require('./config/mongooseConfig');
const { init } = require('./models/Status');

const app = express();
const port = process.env.PORT

const routerStatus = require('./routes/statusRoutes')
const routerTipoMaterial = require('./routes/tipoMaterialRoutes')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/status', routerStatus)
app.use('/tipoMaterial', routerTipoMaterial)

app.listen(port, () => {
    try{
        initDatabase()
        console.log(`Servidor rodando em http://127.0.0.1:${port}/`)    
    }catch(error){
        console.error("Erro ao inicializar o servidor...")
    }
})