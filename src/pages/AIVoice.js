import React from 'react';
import Card from '../components/Card';
import '../styles/Card.css';

const AIVoice = () => {
  return (
    <div className="page">
      <h1>AI声音</h1>
      <Card title="功能说明">
        <p>🔧 AI声音功能正在开发中，即将上线！</p>
        <p>预计功能：</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>文字转语音</li>
          <li>语音克隆</li>
          <li>声音编辑</li>
          <li>多语言支持</li>
        </ul>
      </Card>
    </div>
  );
};

export default AIVoice;
