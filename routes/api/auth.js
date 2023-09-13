var express = require("express");
const UserModel = require("../../model/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

var router = express.Router();

//登录操作
router.post("/login", (req, res) => {
  //查询数据库,检测req.body的数据是否与数据库内容一致
  let { username, password } = req.body;
  UserModel.findOne(
    { username: username, password: md5(password) },
    (err, data) => {
      if (err) {
        res.json({
          code: "2001",
          msg: "数据库读取失败",
          data: null,
        });
        return;
      }
      //判断data
      if (!data) {
        return res.json({
          code: "2002",
          msg: "用户名或密码错误",
          data: null,
        });
      }
      //创建当前用户的token
      let token = jwt.sign(
        {
          username: data.username,
          _id: data._id,
        },
        `${secret}`,
        {
          expiresIn: 60 * 60 * 24 * 7,
        }
      );

      //响应token
      res.json({
        code: "0000",
        msg: "登陆成功",
        data: token,
      });
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
