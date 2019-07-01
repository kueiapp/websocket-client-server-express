"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_module_1 = __importDefault(require("./db.module"));
var insertArticle = function () {
};
/*  Article GET 取得  */
var selectArticle = function () {
    return new Promise(function (resolve, reject) {
        db_module_1.default.getConnection(function (connectionError, connection) {
            if (connectionError) {
                reject(connectionError); // 若連線有問題回傳錯誤
            }
            else {
                connection.query(// Article撈取所有欄位的值組
                "SELECT * FROM news_list", function (error, result) {
                    if (error) {
                        console.error('SQL error: ', error);
                        reject(error); // 寫入資料庫有問題時回傳錯誤
                    }
                    else {
                        resolve(result); // 撈取成功回傳 JSON 資料
                    }
                    connection.release();
                });
            }
        });
    });
};
exports.default = {
    selectArticle: selectArticle, insertArticle: insertArticle
};
//# sourceMappingURL=article.module.js.map