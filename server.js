const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// Setup express server port from ENV, default: 3000
app.set('port',3000)

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

app.use(require('./app/router'))
app.listen(app.get('port'))

module.exports = app // for testing
