/**
* by kueiapp.com
*/

// ES6
import * as http from 'http';
import * as fs from 'fs';
import mysql, {Pool,PoolConnection,MysqlError} from 'mysql';
import {Request, Response} from 'express';

const server = http.createServer((req:Request, res:Response)=>{
    res.end('Hello Node!');
});

// default framework without Express
http.createServer(function(request:Request, response:Response) {

  fs.readFile(__dirname + '/public/manifest.json', (err,file) => {
    if(err){
      response.writeHead(500)
      response.end("Error")
      return
    }
    else{
      response.writeHead(200,{
        "Content-Type": "application/json; charset=utf-8"
      })
      response.end(file, 'utf8')
    }
  })

})
// .listen(8000,function(){
//   console.log("listening to port 8000")
// });

// ES5 requires are workable
const express = require('express');
const bodyParser = require('body-parser');
// import * as express from 'express';
// import * as bodyParser from 'body-parser';

// Express
const app = express();

// static files
app.use(express.static(__dirname + '/public'));


// create application/json parser to support json encoded bodies
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }) )// false:string, true:all types

const port = process.env.PORT || 3000;

/** node.js main **/
app.listen(port, function() {
  console.log("Listening on ",port);
});

const NODE_ENV = "development"
const MYSQL_HOST = "localhost"
const MYSQL_PORT = 3306
const MYSQL_USER = "root"
const MYSQL_PASS = "1234"
const MYSQL_DATABASE = "lifelab_nhk"

/** URI */
app.get('/mysql',function(req:Request,resp:Response){
  const connectionPool = mysql.createPool({ // create connection
    connectionLimit: 10,
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASS,
    database: MYSQL_DATABASE
  });

  var resp2 = resp;
  // setup a connection
  connectionPool.getConnection((err:MysqlError, connection:PoolConnection) => {
    if (err) {
      resp2.send(err);
      console.log('Connection failed！');
    }
    else {
      resp2.send('Connection successful');
      console.log(connection);
    }
  });
});
