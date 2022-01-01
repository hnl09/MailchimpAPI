const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public')) // Tem que colocar arquivos estáticos como HTML e CSS em uma pasta publica para poder usá-los

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
  console.log(`app listening at port:${port}`)
})