const express = require('express');
const router = express.Router();
const { auth, checkCredits } = require('../middleware/auth');
const imageController = require('../controllers/ImageController');

// 所有路由都需要认证
router.use(auth);

// 生成图像（需要积分检查）
router.post('/generate', checkCredits, imageController.generateImage);

// 获取生成历史
router.get('/history', imageController.getHistory);

// 获取单个记录详情
router.get('/record/:id', imageController.getRecordDetail);

module.exports = router;
