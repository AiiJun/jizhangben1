//导入mongoose
const mongoose = require("mongoose");

//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let JokeSchema = new mongoose.Schema({
  //作者
  author: { type: String, required: true },
  //内容
  content: { type: String, required: true },
});

//创建模型对象  对文档操作的封装对象
let JokeModel = mongoose.model("jokes", JokeSchema);

//暴露模型对象
module.exports = JokeModel;
