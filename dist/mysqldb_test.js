"use strict";
/**
 * by kueiapp.com
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ES6
var http = __importStar(require("http"));
var fs = __importStar(require("fs"));
var mysql_1 = __importDefault(require("mysql"));
var server = http.createServer(function (req, res) {
    res.end("Hello Node!");
});
// default framework without Express
http.createServer(function (request, response) {
    fs.readFile(__dirname + "/public/manifest.json", function (err, file) {
        if (err) {
            response.writeHead(500);
            response.end("Error");
            return;
        }
        else {
            response.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            response.end(file, "utf8");
        }
    });
});
// .listen(8000,function(){
//   console.log("listening to port 8000")
// });
// ES5 requires are workable
var express = require("express");
var bodyParser = require("body-parser");
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// Express
var app = express();
// static files
app.use(express.static(__dirname + "/public"));
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
app.get("/mysql", function (req, resp) {
    var connectionPool = mysql_1.default.createPool({
        // create connection
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DATABASE,
    });
    var resp2 = resp;
    // setup a connection
    connectionPool.getConnection(function (err, connection) {
        if (err) {
            resp2.send(err);
            console.log("Connection failed！");
        }
        else {
            resp2.send("Connection successful");
            console.log(connection);
        }
    });
});
//# sourceMappingURL=mysqldb_test.js.map