const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const initDatabase = require('./config/mongooseConfig')
const configStatus = require('./config/statusConfig')
const configTipoMaterial = require('./config/tipoMaterialConfig')

const app = express();
const port = process.env.PORT

const routerStatus = require('./routes/statusRoutes')
const routerTipoMaterial = require('./routes/tipoMaterialRoutes')
const routerAmbiente = require('./routes/ambienteRoutes')
const routerEndereco = require('./routes/enderecoRoutes')
const routerFuncionario = require('./routes/funcionarioRoutes')
const routerAuth = require('./routes/authRoutes')
const routerMaterial = require('./routes/materialRoutes')
const routerCliente = require('./routes/clienteRoutes')
const routerPrecoMaterial = require('./routes/precoMaterialRoutes')
const routerOrcamento = require('./routes/orcamentoRoutes')
const routerItemOrcamento = require('./routes/itemOrcamentoRoutes')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/status', routerStatus)
app.use('/tipoMaterial', routerTipoMaterial)
app.use('/ambiente', routerAmbiente)
app.use('/endereco', routerEndereco)
app.use('/funcionario', routerFuncionario)
app.use('/auth', routerAuth)
app.use('/material', routerMaterial)
app.use('/cliente', routerCliente)
app.use('/precoMaterial', routerPrecoMaterial)
app.use('/orcamento', routerOrcamento)
app.use('/itemOrcamento', routerItemOrcamento)

app.listen(port, () => {
    try{
        initDatabase()
        configStatus()
        configTipoMaterial()
        console.log(`Servidor rodando em http://127.0.0.1:${port}/`)    
    }catch(error){
        console.error("Erro ao inicializar o servidor...")
    }
})