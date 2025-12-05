import React from 'react';
import Card from '../components/Card';
import '../styles/App.css';

const Home = () => {
  return (
    <div className="page active">
      <h1>欢迎来到 AI好伴</h1>
      <Card title="平台介绍">
        <p>这里是你的 AI 一站式平台总入口。</p>
        <p>请点击左侧：图像生成 开始体验。</p>
        <p>我们提供以下功能：</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>🖼️ AI图像生成</li>
          <li>🎬 AI视频生成</li>
          <li>🔊 AI声音合成</li>
          <li>🔍 智能搜索</li>
          <li>📊 PPT自动生成</li>
          <li>📝 论文写作助手</li>
        </ul>
      </Card>
    </div>
  );
};

export default Home;
