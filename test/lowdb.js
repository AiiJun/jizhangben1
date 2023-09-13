//导入lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
//获取数据对象
const db = low(adapter);

//初始化数据
// db.defaults({ posts: [], user: {} }).write();

//写入数据
// db.get("posts").push({ id: 1, title: "今天天气还不错~~!" }).write();
// db.get("posts").unshift({ id: 0, title: "哎哟不错哦~~!" }).write();

//获取单条数据
// let res = db.get("posts").find({ id: 0 }).value();
// console.log(res);
//获取数据
// console.log(db.get("posts").value());

//删除数据    有返回值
// db.get("posts").remove({ id: 1 }).write();

//更新数据
// db.get("posts").find({ id: 0 }).assign({title:'今天下雨啦!!!!!!'}).write();
