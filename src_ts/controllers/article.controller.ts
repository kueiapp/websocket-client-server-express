/* article.controller.js
* by kueiapp.com
*/
import {Request, Response} from 'express';
import articleModule from '../modules/article.module';


const articlePost = function(req:Request, res:Response):void {

}

const articleGet = function(req:Request, res:Response):void {
  articleModule.selectArticle()
  .then( function(result):void {
    res.send(result);
  })
  .catch((err) => {
    return res.send(err);
  });
};

export default {
  articleGet,articlePost
};
