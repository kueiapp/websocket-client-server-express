/**
 * main entry
 * by kueiapp.com
 */

import WebSocket from "ws";
import http from "http";
import setting from "./config/setting";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

// Express
const app: Application = express();

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false })); // false:string, true:all types

/** @remarks routes */
app.get("/", (req: Request, res: Response) => {
	console.log(`path: /, param: ${req.params.name}`);
	res.send(
		`on http://127.0.0.1:${setting.config.port} (${setting.config.env})`
	);
});

/** @remarks socket server */
const server: http.Server = http.createServer(app);
const ws: WebSocket.Server = new WebSocket.Server({ server });

ws.on("connection", (connection: WebSocket) => {
	connection.on("open", () => {
		console.log(`socket connection opened`);
		connection.send("conncection is open");
	});

	connection.on("message", (msg: string) => {
		console.log(`reveive msg: ${msg}`);
		connection.send(`server got your msg: ${msg}`);

		// broadcast to other clients
		ws.clients.forEach((client) => {
			if (client !== connection && client.readyState === WebSocket.OPEN) {
				client.send(msg);
			}
		});
	});

	setInterval(() => {
		connection.send(`hello this is server message`);
	}, 5000);
});

/** node.js main **/
server.listen(3000, () => {
	console.log("socket server is listening on ", 3000);
});
