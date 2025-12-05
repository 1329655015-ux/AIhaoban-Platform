import React from 'react';
import Card from '../components/Card';

const UserCenter = () => {
  return (
    <div className="page">
      <h1>个人中心</h1>
      <Card title="用户信息">
        <p>👤 个人中心功能正在开发中，即将上线！</p>
        <p>功能包括：</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>用户信息管理</li>
          <li>积分系统</li>
          <li>生成历史</li>
          <li>设置</li>
        </ul>
      </Card>
    </div>
  );
};

export default UserCenter;
