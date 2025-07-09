const mongo = require('mongoose')

module.exports = async () => {
  try {
    await mongo.connect(process.env.DATABASE_URL)

    console.log("Conectado ao banco")
  } catch (error) {
    console.error("Erro ao tentar conectar com o banco: ", error)
  }  
}