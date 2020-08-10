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
        // get from db.module
        db_module_1.default.getConnection(function (connectionError, connection) {
            if (connectionError) {
                reject(connectionError);
            }
            else {
                connection.query("SELECT * FROM news_list", function (error, result) {
                    if (error) {
                        console.error('SQL error: ', error);
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                    // release memory
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