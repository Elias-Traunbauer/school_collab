var https = require('https');
var fs = require('fs');

const next = require('next')
const port = 3000
const dev = true
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()


var options = {
    key: fs.readFileSync('dev.key'),
    cert: fs.readFileSync('dev.crt'),
    ca: [fs.readFileSync('RootCA.crt')]
};

app.prepare().then(() => {
    https.createServer(options, (req, res) => {
        handle(req, res)
    }).listen(port, err => {
        if (err) throw err
        console.log(`> Ready on localhost:${port}`)
    })
})