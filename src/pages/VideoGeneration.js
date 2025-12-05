import React from 'react';
import Card from '../components/Card';
import '../styles/Card.css';

const VideoGeneration = () => {
  return (
    <div className="page">
      <h1>视频生成</h1>
      <Card title="功能说明">
        <p>🚧 视频生成功能正在开发中，即将上线！</p>
        <p>预计功能：</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>AI视频生成</li>
          <li>视频风格转换</li>
          <li>视频特效添加</li>
          <li>智能剪辑</li>
        </ul>
      </Card>
    </div>
  );
};

export default VideoGeneration;
