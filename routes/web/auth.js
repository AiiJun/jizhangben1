var express = require("express");
var router = express.Router();

const UserModel = require("../../model/UserModel");
const md5 = require("md5");
//注册
router.get("/reg", (req, res) => {
  //响应HTML内容
  res.render("auth/reg");
});

//注册用户
router.post("/reg", (req, res) => {
  //先进行表单验证
  //再获取请求体数据插入到数据库中
  UserModel.create(
    { ...req.body, password: md5(req.body.password) },
    (err, data) => {
      if (err) {
        res.status(500).send("注册失败");
        return;
      }
      res.render("success", { msg: "注册成功", url: "/login" });
    }
  );
});

//登录页面
router.get("/login", (req, res) => {
  //响应HTML内容
  res.render("auth/login");
});

//登录操作
router.post("/login", (req, res) => {
  //查询数据库,检测req.body的数据是否与数据库内容一致
  let { username, password } = req.body;
  UserModel.findOne(
    { username: username, password: md5(password) },
    (err, data) => {
      if (err) {
        res.status(500).send("登陆失败");
        return;
      }
      //判断data
      if (!data) {
        return res.send("账号或密码错误");
      }

      //写入session
      req.session.username = data.username;
      req.session._id = data._id;

      //登陆成功跳转记账本
      res.redirect("/");
    }
  );
});

//退出登录
router.post("/logout", (req, res) => {
  //销毁session
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
