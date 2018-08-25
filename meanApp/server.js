var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

var port = process.env.port || 8000;

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//BodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Creating Routers
app.use('/', index);
app.use('/api', tasks);

// Run Server
app.listen(port, () => console.log(`Server Started on Port ${port}`))