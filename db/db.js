/**
 *
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */

module.exports = function (success, error) {
  //判断
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败");
    };
  }
  //2.安装导入 mongoose
  const mongoose = require("mongoose");
  //导入 配置文件config.js
  const { DBHOST, DBPORT, DBNAME } = require("../config/config.js");

  //设置 strictQuery 为 true
  mongoose.set("strictQuery", true);

  //3.链接 mongodb 服务
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  //4.设置回调
  //设置链接成功的回调    事件回调函数只执行一次
  mongoose.connection.once("open", () => {
    success();
  });

  //设置链接失败的回调
  mongoose.connection.on("error", () => {
    error();
  });

  //设置链接关闭的回调
  mongoose.connection.on("close", () => {
    console.log("链接关闭");
  });
};
