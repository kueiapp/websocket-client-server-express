"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
* by kueiapp.com
*/
// ES6
var mysql = __importStar(require("mysql"));
var setting_1 = __importDefault(require("../config/setting"));
var connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: setting_1.default.db.MYSQL_HOST,
    user: setting_1.default.db.MYSQL_USER,
    password: setting_1.default.db.MYSQL_PASS,
    database: setting_1.default.db.MYSQL_DATABASE // 資料庫名稱
});
connectionPool.getConnection(function (err, connection) {
    if (err) {
        console.log('Connection failed！');
    }
    else {
        console.log(connection);
    }
});
exports.default = connectionPool;
//# sourceMappingURL=db.module.js.map