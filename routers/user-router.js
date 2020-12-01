/*
  用户模块
*/
const express = require('express')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common.js'))

// 获取用户信息
router.get('/userinfo', async (req, res) => {
  // 1、获取用户标识id
  // 需要从token中反解出用户的id
  // 这个req.user属性从何而来？
  let id = req.user.id
  // 2、查询数据库
  let sql = 'select id, username, nickname, email, user_pic from myuser where id = ?'
  let ret = await db.operateDb(sql, id)
  // 3、返回结果
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '查询用户信息成功',
      data: ret[0]
    })
  } else {
    res.json({
      status: 1,
      message: '查询用户信息失败'
    })
  }
})

module.exports = router 
