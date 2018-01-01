var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const request = require('request');
var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('58bc55fe9138082bf63a6f6ff8c1c861');


app.use(express.static('./public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

app.get('/', function(request, response) {
    response.sendFile('./public/html/index.html', {root: './'})
})




app.get('/api', function(req, res) {
  console.log(req.query);
  var breweryUrl = `http://api.brewerydb.com/v2/locations?locality=windsor&locations?region=co&key=58bc55fe9138082bf63a6f6ff8c1c861`;
  request(breweryUrl, function(err, response, body) {
    var parse = JSON.parse(body);
    var breweryNames = [];
    var breweryWebsite = [];
    var split = breweryNames.toString()
    for (let breweries of parse.data) {
      breweryNames.push(breweries.brewery.name)
      breweryWebsite.push(breweries.brewery.website)
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
      console.log(breweries.brewery)
      console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
    }
    res.send(breweryNames.toString());
  })
})

app.listen(4000, function() {
  console.log('The app is running on 4000');
})
