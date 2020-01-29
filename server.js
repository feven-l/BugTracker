const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./Server/Controllers/controller');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bugtrackerdb'
});

connection.connect();
const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events(connection));
app.use(express.static(__dirname+'/public/dist/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
require('./server/Controllers/controller')(app);

const port = 8000;


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});