import React from 'react';
import '../styles/Card.css';

const GenerateButton = ({ onClick, loading, children, disabled = false }) => {
  return (
    <button 
      className="generate-btn" 
      onClick={onClick} 
      disabled={disabled || loading}
    >
      {loading ? '处理中...' : children}
    </button>
  );
};

export default GenerateButton;
