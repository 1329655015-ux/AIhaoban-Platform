const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

// 验证JWT令牌
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: '请先登录' });
  }
};

// 验证积分
const checkCredits = async (req, res, next) => {
  try {
    const user = req.user;
    const creditsNeeded = req.creditsNeeded || 10;

    if (user.credits < creditsNeeded) {
      return res.status(400).json({
        success: false,
        message: `积分不足，需要${creditsNeeded}积分，当前${user.credits}积分`
      });
    }

    req.creditsNeeded = creditsNeeded;
    next();
  } catch (error) {
    res.status(500).json({ error: '服务器错误' });
  }
};

module.exports = { auth, checkCredits };
