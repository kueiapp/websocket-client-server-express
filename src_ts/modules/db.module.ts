/**
* by kueiapp.com
*/
// ES6
import mysql, {Pool,PoolConnection,MysqlError} from 'mysql';
import setting from '../config/setting'

// create a connection
const connectionPool:Pool = mysql.createPool({ 
  connectionLimit: 10, 
  host: setting.db.MYSQL_HOST, 
  user: setting.db.MYSQL_USER, 
  password: setting.db.MYSQL_PASS, 
  database: setting.db.MYSQL_DATABASE 
});

connectionPool.getConnection((err:MysqlError, connection:PoolConnection):void => { 
  if (err) {
    console.log('Connection failed！');
  }
  else {
    console.log(connection);
  }
});

export default connectionPool;
