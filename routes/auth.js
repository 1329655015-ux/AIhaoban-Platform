const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否存在
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '用户名或邮箱已存在'
      });
    }

    // 创建新用户
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // 生成JWT
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d'
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        credits: user.credits,
        membership: user.membership
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '注册失败'
    });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码错误'
      });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '邮箱或密码错误'
      });
    }

    // 生成JWT
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '7d'
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        credits: user.credits,
        membership: user.membership
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '登录失败'
    });
  }
});

// 获取当前用户信息
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未授权'
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: '用户不存在'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: '无效的令牌'
    });
  }
});

module.exports = router;
