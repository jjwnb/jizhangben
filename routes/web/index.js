var express = require('express');
var router = express.Router();
// 导入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
// 导入中间件检测登录
const checkLoginMiddleware = require('../../Middleware/checkLoginMiddleware')
// 添加首页路由规则
router.get('/', (req, res) => {
  // 重定向 /account
  res.redirect('/account')

})

/* 记账本列表*/
router.get('/account', checkLoginMiddleware, function (req, res, next) {


  // 获取所有账单信息
  // let accounts = db.get('accounts').value()
  // console.log(accounts);
  // 读取集合信息
  AccountModel.find().sort({ time: -1 }).then((data, err) => {
    if (err) {
      console.log('读取失败');
      return
    }
    res.render('list', { accounts: data, moment: moment })
  })

});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function (req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', checkLoginMiddleware, (req, res) => {
  // 查看表单数据
  // console.log(req.body);
  // req.body
  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改time属性
    time: moment(req.body.time).toDate()
  }).then((data, err) => {
    if (err) {
      res.status(500).send('插入失败~~')
      return
    }
    res.render('success', { msg: '添加成功哦', url: '/account' })
  })

})

// 删除记录
router.get('/account/:id', checkLoginMiddleware, (req, res) => {
  // 获取parms的id参数
  let id = req.params.id
  // 删除
  AccountModel.deleteOne({ _id: id }).then((data, err) => {
    if (err) {
      res.status(500).send('删除失败')
      return
    }
    // 提醒
    res.render('success', { msg: '删除成功哦', url: '/account' })
  })

})

module.exports = router;
