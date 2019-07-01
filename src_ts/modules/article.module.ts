/**
* by kueiapp.com
*/
// ES6
import {Pool,PoolConnection,MysqlError} from 'mysql';
import setting from '../config/setting'
import db from './db.module';

const insertArticle = () => {

};

/*  Article GET 取得  */
const selectArticle = () => {
  return new Promise((resolve, reject) => {
    // get from db.module
    db.getConnection((connectionError:MysqlError, connection:PoolConnection) => { 
      if (connectionError) {
        reject(connectionError); 
      }
      else {
        connection.query( 
          `SELECT * FROM news_list`
          , (error, result) => {
            if (error) {
              console.error('SQL error: ', error);
              reject(error); 
            }
            else {
              resolve(result); 
            }

            // release memory
            connection.release();
          }
        );
      }
    });
  });
};

export default {
  selectArticle,insertArticle
};
