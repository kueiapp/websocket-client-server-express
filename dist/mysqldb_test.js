"use strict";
/**
* by kueiapp.com
*/
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// ES6
var http = __importStar(require("http"));
var fs = __importStar(require("fs"));
var mysql = __importStar(require("mysql"));
var server = http.createServer(function (req, res) {
    res.end('Hello Node!');
});
// default framework without Express
http.createServer(function (request, response) {
    fs.readFile(__dirname + '/public/manifest.json', function (err, file) {
        if (err) {
            response.writeHead(500);
            response.end("Error");
            return;
        }
        else {
            response.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8"
            });
            response.end(file, 'utf8');
        }
    });
});
// .listen(8000,function(){
//   console.log("listening to port 8000")
// });
// ES5 requires are workable
var express = require('express');
var bodyParser = require('body-parser');
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// Express
var app = express();
app.use(express.static(__dirname + '/public'));
// create application/json parser to support json encoded bodies
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false })); // false:string, true:all types
var port = process.env.PORT || 3000;
/** node.js main **/
app.listen(port, function () {
    console.log("Listening on ", port);
});
var NODE_ENV = "development";
var MYSQL_HOST = "localhost";
var MYSQL_PORT = 3306;
var MYSQL_USER = "root";
var MYSQL_PASS = "1234";
var MYSQL_DATABASE = "lifelab_nhk";
/** URI */
app.get('/mysql', function (res, resp) {
    var connectionPool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DATABASE
    });
    var resp2 = resp;
    // setup a connection
    connectionPool.getConnection(function (err, connection) {
        if (err) {
            resp2.send(err);
            console.log('連線失敗！');
        }
        else {
            resp2.send('連線成功！');
            console.log(connection);
        }
    });
});
//# sourceMappingURL=mysqldb_test.js.map