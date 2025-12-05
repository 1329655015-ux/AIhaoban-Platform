-- AI好伴平台数据库结构
-- 使用 PostgreSQL 或 MySQL

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    credits INT DEFAULT 100,
    membership VARCHAR(20) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 图像生成记录表
CREATE TABLE IF NOT EXISTS image_records (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    model VARCHAR(50) NOT NULL,
    prompt TEXT NOT NULL,
    image_url TEXT NOT NULL,
    credits_used INT NOT NULL DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 积分交易记录表
CREATE TABLE IF NOT EXISTS credit_transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'earn', 'consume', 'purchase', 'reward'
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 会员订阅记录表
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    plan VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_image_records_user_id ON image_records(user_id);
CREATE INDEX idx_image_records_created_at ON image_records(created_at);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);

-- 插入初始数据（可选）
INSERT INTO users (username, email, password_hash, credits, membership) 
VALUES 
('admin', 'admin@aihaoban.com', '$2a$10$YourHashedPasswordHere', 1000, 'pro')
ON CONFLICT (email) DO NOTHING;

-- 创建视图：用户积分汇总
CREATE VIEW user_credit_summary AS
SELECT 
    u.id,
    u.username,
    u.email,
    u.credits,
    COUNT(DISTINCT ir.id) as total_images,
    SUM(CASE WHEN ct.type = 'consume' THEN ct.amount ELSE 0 END) as total_consumed,
    SUM(CASE WHEN ct.type = 'purchase' THEN ct.amount ELSE 0 END) as total_purchased
FROM users u
LEFT JOIN image_records ir ON u.id = ir.user_id
LEFT JOIN credit_transactions ct ON u.id = ct.user_id
GROUP BY u.id, u.username, u.email, u.credits;
