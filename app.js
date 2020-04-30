require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const webPush = require('web-push');
const app = express()
const PORT = 3000

app.use(bodyParser.json());

const payload = "Payloadddddd"

const options = {
    vapidDetails: {
        subject: 'https://jplayer.co.uk',
        publicKey: process.env.VAPID_PUB,
        privateKey: process.env.VAPID_PRIV
    },
    TTL: 60
}

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/push', (req, res) => {
    console.log(req.body, 'this is req.body')
    const subscription = {
        "endpoint": req.body.endpoint,
        "keys": req.body.keys
    }

    webPush.sendNotification(
        subscription,
        payload,
        options
    ).then((data) => {
        return res.json({ found: data })
    })
        .catch((err) => {
            console.error(err)
        })
    
})

app.listen(process.env.PORT || port, () => console.log(`Listening on ${process.env.PORT}`))