require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/aihaoban',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  openaiApiKey: process.env.OPENAI_API_KEY,
  stabilityApiKey: process.env.STABILITY_API_KEY,
  
  // AI服务配置
  aiServices: {
    stableDiffusion: {
      apiKey: process.env.STABILITY_API_KEY,
      endpoint: 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image'
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      endpoint: 'https://api.openai.com/v1/images/generations'
    }
  }
};

module.exports = config;
