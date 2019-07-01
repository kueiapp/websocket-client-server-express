/** main.ts
* by kueiapp.com
*/


import express, {Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.get('/', function(req:Request, res:Response, next: NextFunction){
  res.send("hello typescript")
});

app.listen(3000, function(){
  console.log("listening 3000")
})

