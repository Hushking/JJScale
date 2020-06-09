const express = require('express')
const cors = require('cors')
const requireDir = require('require-dir')
const app = express()

app.set('port', (process.env.PORT || 5000));
app.use(cors())

app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('App is running, server is listening on port ', app.get('port'));
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

function main() {
  requireDir('./src/models')
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use('/api', require('./src/routers'))
  app.listen(8000)
}

main()