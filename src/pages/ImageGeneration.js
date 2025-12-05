import React, { useState } from 'react';
import Card from '../components/Card';
import GenerateButton from '../components/GenerateButton';
import '../styles/Card.css';

const ImageGeneration = () => {
  const [model, setModel] = useState('Stable Diffusion');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('请输入提示词');
      return;
    }

    setGenerating(true);
    
    // 模拟API调用
    setTimeout(() => {
      setResult({
        imageUrl: 'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?w=512&h=512&fit=crop',
        model: model,
        prompt: prompt,
        createdAt: new Date().toLocaleString()
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="page">
      <h1>图像生成</h1>
      
      <Card title="生成设置">
        <label>选择模型：</label>
        <select 
          value={model} 
          onChange={(e) => setModel(e.target.value)}
          className="form-select"
        >
          <option value="Stable Diffusion">Stable Diffusion</option>
          <option value="DALL·E">DALL·E</option>
          <option value="MidJourney">MidJourney</option>
          <option value="文心一格">文心一格</option>
        </select>

        <label>输入提示词：</label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：一个美女模特在咖啡馆，写实风格"
          className="form-input"
        />

        <GenerateButton 
          onClick={handleGenerate} 
          loading={generating}
        >
          开始生成图片
        </GenerateButton>

        <div className="result-container">
          {generating && (
            <div className="loading">
              <div className="spinner"></div>
              <p>正在生成中，请稍等...</p>
              <p>模型：{model}</p>
              <p>提示词：{prompt}</p>
            </div>
          )}
          
          {result && !generating && (
            <div className="result">
              <p>✅ 生成成功</p>
              <p><strong>模型：</strong>{result.model}</p>
              <p><strong>提示词：</strong>{result.prompt}</p>
              <p><strong>生成时间：</strong>{result.createdAt}</p>
              <img 
                src={result.imageUrl} 
                alt="AI生成图片" 
                className="generated-image"
              />
              <div className="image-actions">
                <button className="secondary-btn">下载图片</button>
                <button className="secondary-btn">重新生成</button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImageGeneration;
