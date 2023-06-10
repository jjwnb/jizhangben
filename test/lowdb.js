const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
// 导入shortid
const shortid = require('shortid')
// 获取db对象
const db = low(adapter)

// 初始数据
// db.defaults({ posts: [], user: {} }).write()
// 获取单条数据
// let res = db.get('posts').find({ id: 1 }).value()
// console.log(res);

// 写入数据
// db.get('posts').push({ id: 1, title: '新闻' }).write()

// 获取数据
// console.log(db.get('posts').value());

// 删除数据
// db.get('posts').remove({ id: 1}).write()

// 更新数据
// db.get('posts').find({ id: 1 }).assign({ title: '下雨了' }).write()