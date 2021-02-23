// Setup Express
var express = require('express')
var app = express()

// Setup Handlebars
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' })
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

// Initiate bodyParser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

// Set port
app.set('port', 5844)

// GET Function
app.get('/', function (req, res) { // Declare route

    var querParam = [] // Empty list for query parameters
    var context = {} // Declare empty object to later become array
    context.reqType = 'GET' // Declare request type

    for (var name in req.query) { // For each name in the query request, push the name and value to the querParam list
        querParam.push({ 'name': name, 'value': req.query[name] })
    }
    
    context.paramList = querParam // Dot notation to add now filled list as property value to paramList key in context object
    res.render('results', context) // Output
})

// POST Function
app.post('/', function (req, res) { // Declare route

    var bodParams = [] 
    var querParams = []
    var context = {}
    context.reqType = 'POST'
    
    // 2 for loops; one for URL query string and one for request body (JSON data)

    for (var p in req.body) {
        bodParams.push({ 'name': p, 'value': req.body[p] })
    }

    for (var p in req.query) { 
        querParams.push({ 'name': p, 'value': req.query[p] })
    }

    context.queryList = querParams
    context.bodyList = bodParams
    res.render('results', context)
})

// 404 Error
app.use(function (req, res) {
    res.status(404)
    res.render('404')
})

// 500 Error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.type('plain/text')
    res.status(500)
    res.send('500 - Server Error')
})

// Listener
app.listen(app.get('port'), function () {
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.')
})


// References
/*
Handlebars
https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
CommonJS Module Notification
https://github.com/microsoft/vscode/issues/47299
Handlebars Helpers
https://handlebarsjs.com/guide/builtin-helpers.html
GET & POST Requests
https://canvas.oregonstate.edu/courses/1798808/pages/html-forms?module_item_id=20387862
Middleware
https://expressjs.com/en/guide/using-middleware.html
*/