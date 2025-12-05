const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');

// 导入路由
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/images');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'AI好伴后端服务'
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '路由不存在'
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 连接数据库并启动服务器
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB连接成功');
  
  app.listen(config.port, () => {
    console.log(`🚀 服务器运行在 http://localhost:${config.port}`);
    console.log(`📊 健康检查: http://localhost:${config.port}/health`);
  });
})
.catch(err => {
  console.error('❌ MongoDB连接失败:', err);
  process.exit(1);
});

module.exports = app;
