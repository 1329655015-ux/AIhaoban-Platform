# AI好伴平台

一站式AI智能创作平台

## 项目概述
AI好伴是一个集合多种AI生成工具的SaaS平台，提供图像生成、视频生成、AI声音、超级搜索、PPT制作、论文助手等功能。

## 项目结构
AIhaoban-Platform/
├── frontend/ # 前端React应用
├── backend/ # 后端Node.js API服务
├── database/ # 数据库相关文件
└── README.md # 项目说明文档

## 技术栈
- 前端：React, React Router, Axios
- 后端：Node.js, Express, MongoDB/Mongoose
- 样式：CSS Modules

## 快速开始
### 安装依赖
```bash
# 前端
cd frontend && npm install

# 后端
cd backend && npm install

# 前端
cd frontend && npm start

# 后端
cd backend && npm run dev

前端：Vercel 或 Netlify

后端：Heroku, Railway 或 Render

数据库：MongoDB Atlas 或 PostgreSQL


### 2. **.gitignore**
```gitignore
# 依赖
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 环境变量
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 构建输出
dist/
build/
out/

# 日志
logs
*.log

# 编辑器
.vscode/
.idea/
*.swp
*.swo

# 系统文件
.DS_Store
Thumbs.db

# 缓存
.cache
