var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
// 导入moment
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware = require('../../Middleware/checkTokenMiddleware')

/* 记账本列表*/
router.get('/account', checkTokenMiddleware, function (req, res, next) {


    // 获取所有账单信息
    // let accounts = db.get('accounts').value()
    // console.log(accounts);
    // 读取集合信息
    AccountModel.find().sort({ time: -1 }).then((data, err) => {
        if (err) {
            return res.json({
                code: '1001',
                msg: '读取失败',
                data: null
            })
        }
        res.json({
            // 响应编号
            code: '0000',
            // 响应的信息
            msg: '读取成功',
            // 响应的数据
            data: data
        })
    })

});

// 新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
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
            res.json({
                code: '1002',
                msg: '创建失败',
                data: null
            })
            return
        }
        res.json({
            code: '0000',
            mag: '添加成功',
            data: data
        })
    })

})

// 删除记录
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
    // 获取parms的id参数
    let { id } = req.params
    // 删除
    AccountModel.deleteOne({ _id: id }).then((data, err) => {
        if (err) {
            res.json({
                code: '1003',
                msg: '删除失败',
                data: null
            })
            return
        }
        // 提醒
        res.json({
            code: '0000',
            msg: '删除成功',
            data: {}
        })
    })

})

// 获取单个账单信息
router.get('/account/:id', (req, res) => {
    // 获取id参数
    let { id } = req.params
    // 查询数据库
    AccountModel.findById({ _id: id }).then((data, err) => {
        if (err) {

            return res.json({
                code: '1004',
                msg: '读取失败',
                data: null
            })
        }
        // 成功响应
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        })
    })
})

// 更新账单
router.patch('/account/:id', (req, res) => {
    let { id } = req.params
    AccountModel.updateOne({ _id: id }, req.body).then((data, err) => {
        if (err) {
            return res.json({
                code: '10005',
                msg: '更新失败',
                data: null
            })
        }
        // 再次查询数据库 获取单条数据
        AccountModel.findById({ _id: id }).then((data, err) => {
            if (err) {

                return res.json({
                    code: '1004',
                    msg: '读取失败',
                    data: null
                })
            }
            // 成功响应
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data
            })
        })
    })
})

module.exports = router;
