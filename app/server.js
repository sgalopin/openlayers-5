var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic(path.join(__dirname, 'htdocs')))
app.use(serveStatic(path.join(__dirname, 'node_modules')))
app.use(serveStatic(path.join(__dirname, 'node_modules/ol')))
app.listen(80, function(){
    console.log('Server running on 80...');
})