var express = require("express");
const jwt = require("jsonwebtoken");
//导入 checkTokenMiddleware 中间件
const checkTokenMiddleware = require("../../middlewares/checkTokenMiddleware");

var router = express.Router();
//导入moment
const moment = require("moment");
const AccountModel = require("../../model/AccountModel");

//记账本的列表
router.get("/", checkTokenMiddleware, function (req, res, next) {
  console.log(req.user);
  //获取数据库中的账单信息
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
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

//新增记录
router.post("/create", checkTokenMiddleware, (req, res) => {
  //表单验证

  //插入数据库
  AccountModel.create(
    {
      ...req.body,
      //修改time属性的值  使用moment将日期转为日期对象
      time: moment(req.body.time).toDate(),
    },
    (err, data) => {
      if (err) {
        res.json({
          //响应的编号
          code: "1002",
          //响应的信息
          msg: "创建失败",
          //响应的数据
          data: null,
        });
        return;
      }
      //成功提醒
      res.json({
        //响应的编号
        code: "0000",
        //响应的信息
        msg: "创建成功",
        //响应的数据
        data: data,
      });
    }
  );
});

//删除记录
router.delete("/account/:id", checkTokenMiddleware, (req, res) => {
  let id = req.params.id;
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        //响应的编号
        code: "1003",
        //响应的信息
        msg: "删除账单失败",
        //响应的数据
        data: null,
      });
      return;
    }
    //成功提醒
    res.json({
      //响应的编号
      code: "0000",
      //响应的信息
      msg: "删除成功",
      //响应的数据
      data: {},
    });
  });
});

//获取单条账单的数据
router.get("/account/:id", checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  AccountModel.findById(id, (err, data) => {
    if (err) {
      res.json({
        code: "1004",
        msg: "读取失败",
        data: null,
      });
    }
    res.json({
      code: "0000",
      msg: "读取成功",
      data: data,
    });
  });
});

//更新单条账单接口
router.patch("/account/:id", checkTokenMiddleware, (req, res) => {
  //获取id参数值
  let { id } = req.params;
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.json({
        code: "1005",
        msg: "更新失败",
        data: null,
      });
    }
    //再次查询数据库获取单条数据
    AccountModel.findById(id, (err, data) => {
      if (err) {
        res.json({
          code: "1004",
          msg: "读取失败",
          data: null,
        });
      }
      res.json({
        code: "0000",
        msg: "更新成功",
        data: data,
      });
    });
  });
});

module.exports = router;
