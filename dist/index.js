"use strict";
/**
 * main entry
 * by kueiapp.com
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var http_1 = __importDefault(require("http"));
var setting_1 = __importDefault(require("./config/setting"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// Express
var app = express_1.default();
// create application/x-www-form-urlencoded parser
app.use(body_parser_1.default.urlencoded({ extended: false })); // false:string, true:all types
/** @remarks routes */
app.get("/", function (req, res) {
    console.log("path: /, param: " + req.params.name);
    res.send("on http://127.0.0.1:" + setting_1.default.config.port + " (" + setting_1.default.config.env + ")");
});
/** @remarks socket server */
var server = http_1.default.createServer(app);
var ws = new ws_1.default.Server({ server: server });
ws.on("connection", function (connection) {
    connection.on("open", function () {
        console.log("socket connection opened");
        connection.send("conncection is open");
    });
    connection.on("message", function (msg) {
        console.log("reveive msg: " + msg);
        connection.send("server got your msg: " + msg);
        // broadcast to other clients
        ws.clients.forEach(function (client) {
            if (client !== connection && client.readyState === ws_1.default.OPEN) {
                client.send(msg);
            }
        });
    });
    setInterval(function () {
        connection.send("hello this is server message");
    }, 5000);
});
/** node.js main **/
server.listen(3000, function () {
    console.log("socket server is listening on ", 3000);
});
//# sourceMappingURL=index.js.map