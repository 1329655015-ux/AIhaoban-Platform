import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', name: '首页', icon: '🏠' },
    { path: '/image', name: '图像生成', icon: '🖼️' },
    { path: '/video', name: '视频生成', icon: '🎬' },
    { path: '/voice', name: 'AI声音', icon: '🔊' },
    { path: '/search', name: '超级AI搜索', icon: '🔍' },
    { path: '/ppt', name: '精美PPT', icon: '📊' },
    { path: '/paper', name: '论文助手', icon: '📝' },
    { path: '/user', name: '个人中心', icon: '👤' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">🚀 AI好伴</div>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-text">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
