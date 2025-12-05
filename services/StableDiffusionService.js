const axios = require('axios');
const config = require('../config/config');

class StableDiffusionService {
  constructor() {
    this.apiKey = config.aiServices.stableDiffusion.apiKey;
    this.endpoint = config.aiServices.stableDiffusion.endpoint;
  }

  async generateImage(prompt, options = {}) {
    try {
      const response = await axios.post(
        this.endpoint,
        {
          text_prompts: [{ text: prompt, weight: 1 }],
          cfg_scale: options.cfgScale || 7,
          height: options.height || 512,
          width: options.width || 512,
          steps: options.steps || 30,
          samples: options.samples || 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      );

      if (response.data.artifacts && response.data.artifacts.length > 0) {
        // 返回base64编码的图像
        const base64Image = response.data.artifacts[0].base64;
        return {
          success: true,
          imageUrl: `data:image/png;base64,${base64Image}`,
          metadata: response.data
        };
      }

      throw new Error('No image generated');
    } catch (error) {
      console.error('Stable Diffusion API Error:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = StableDiffusionService;
