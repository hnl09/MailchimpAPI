const { response } = require('express')
const express = require('express')
const https = require('https')
const DotEnv = require('dotenv').config()
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true})) // Body-parser Atual
app.use(express.static(__dirname + '/public')) // Tem que colocar arquivos estáticos como HTML e CSS em uma pasta publica para poder usá-los

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
    const firstName = req.body.Fname
    const lastName = req.body.Lname
    const email = req.body.email

    const data = { 
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            },
        }
    ]
    }
const jsonData = JSON.stringify(data)

    const url = `https://us1.api.mailchimp.com/3.0/lists/${process.env.LIST_ID}`

    const options = {
        method: 'POST',
        auth: `naylor:${process.env.MAILCHIMP_API_KEY}`
    }

 const request = https.request(url, options,(response) => {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/public/sucess.html")
    } else {
        res.sendFile(__dirname + "/public/failure.html")
    }

 })

request.write(jsonData)
request.end()

})

app.post('/failure', function(req, res) {
    res.redirect("/")
})

app.listen(port, () => {
  console.log(`app listening at port:${port}`)
})