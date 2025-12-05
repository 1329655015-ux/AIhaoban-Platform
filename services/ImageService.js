const StableDiffusionService = require('./StableDiffusionService');
const ImageRecord = require('../models/ImageRecord');
const User = require('../models/User');

class ImageService {
  constructor() {
    this.stableDiffusionService = new StableDiffusionService();
  }

  async generateImage(userId, model, prompt, options = {}) {
    try {
      let result;
      
      // 根据选择的模型调用不同的服务
      switch (model) {
        case 'Stable Diffusion':
          result = await this.stableDiffusionService.generateImage(prompt, options);
          break;
        case 'DALL·E':
          // 实现DALL·E调用
          result = { success: false, error: 'DALL·E暂未实现' };
          break;
        default:
          result = { success: false, error: '不支持的模型' };
      }

      if (!result.success) {
        return result;
      }

      // 扣除用户积分
      const creditsUsed = 10; // 默认消耗10积分
      await User.findByIdAndUpdate(userId, { $inc: { credits: -creditsUsed } });

      // 保存生成记录
      const record = new ImageRecord({
        userId,
        model,
        prompt,
        imageUrl: result.imageUrl,
        creditsUsed,
        metadata: result.metadata || {}
      });

      await record.save();

      return {
        success: true,
        imageUrl: result.imageUrl,
        recordId: record._id,
        creditsUsed
      };
    } catch (error) {
      console.error('Image generation service error:', error);
      return {
        success: false,
        error: '生成失败，请稍后重试'
      };
    }
  }

  async getUserHistory(userId, page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      
      const records = await ImageRecord.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await ImageRecord.countDocuments({ userId });

      return {
        success: true,
        records,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: '获取历史记录失败'
      };
    }
  }
}

module.exports = ImageService;
