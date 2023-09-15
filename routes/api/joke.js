var express = require("express");
const JokeModel = require("../../model/JokeModel");

var router = express.Router();

router.get("/getJoke", function (req, res, next) {
  JokeModel.find().exec((err, data) => {
    if (err) {
      res.json({
        //响应的编号
        code: "1001",
        //响应的信息
        msg: "读取读取失败",
        //响应的数据
        data: null,
      });
      return;
    }
    //成功提醒   render与json不能同时使用
    res.json({
      //响应的编号
      code: "0000",
      //响应的信息
      msg: "读取成功",
      //响应的数据
      data: data,
    });
  });
});

router.post("/getJoke/create", function (req, res, next) {
  JokeModel.create({ ...req.body }),
    (err, data) => {
      if (err) {
        res.json({
          //响应的编号
          code: "1001",
          //响应的信息
          msg: "读取读取失败",
          //响应的数据
          data: null,
        });
        return;
      }
      //成功提醒   render与json不能同时使用
      res.json({
        //响应的编号
        code: "0000",
        //响应的信息
        msg: "读取成功",
        //响应的数据
        data: data,
      });
    };
});

module.exports = router;
