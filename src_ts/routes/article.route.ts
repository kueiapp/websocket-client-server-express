/*/ article.route.js
* by kueiapp.com
*/

import express from 'express';
import articleCtrl from '../controllers/article.controller';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json() ) // for POST body

// parent route
router.route('/')
  .get( articleCtrl.articleGet )
  .post( articleCtrl.articlePost );

export default router;
