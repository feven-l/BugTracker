const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./Server/Controllers/controller');
const session = require('express-session')

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bugtrackerdb'
});

// connection.connect();

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express()
.use(cors())
.use(bodyParser.json())
.use(events(connection));
app.use(express.static(__dirname+'/public/dist/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
require('./server/Controllers/controller')(app);
require('./Server/Routes/routes')(app);

const port = 8000;
app.set('trust proxy', 1) // trust first proxy

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});