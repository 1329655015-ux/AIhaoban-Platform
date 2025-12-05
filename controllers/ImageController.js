const ImageService = require('../services/ImageService');
const { checkCredits } = require('../middleware/auth');

class ImageController {
  constructor() {
    this.imageService = new ImageService();
  }

  // 生成图像
  async generateImage(req, res) {
    try {
      const { model, prompt, options } = req.body;
      const userId = req.user._id;

      // 验证输入
      if (!model || !prompt) {
        return res.status(400).json({
          success: false,
          message: '请提供模型和提示词'
        });
      }

      const result = await this.imageService.generateImage(userId, model, prompt, options);

      if (!result.success) {
        return res.status(500).json(result);
      }

      res.json({
        success: true,
        data: {
          imageUrl: result.imageUrl,
          recordId: result.recordId,
          creditsUsed: result.creditsUsed,
          remainingCredits: req.user.credits - result.creditsUsed
        }
      });
    } catch (error) {
      console.error('Generate image error:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误，请稍后重试'
      });
    }
  }

  // 获取生成历史
  async getHistory(req, res) {
    try {
      const userId = req.user._id;
      const { page = 1, limit = 20 } = req.query;

      const result = await this.imageService.getUserHistory(userId, parseInt(page), parseInt(limit));

      if (!result.success) {
        return res.status(500).json(result);
      }

      res.json({
        success: true,
        data: result.records,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取历史记录失败'
      });
    }
  }

  // 获取单个记录详情
  async getRecordDetail(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const record = await ImageRecord.findOne({ _id: id, userId });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: '记录不存在'
        });
      }

      res.json({
        success: true,
        data: record
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: '获取记录详情失败'
      });
    }
  }
}

module.exports = new ImageController();
