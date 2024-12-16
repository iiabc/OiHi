# OiHi

简单的 AI 对话应用，采用前后端分离架构

## 技术栈

- Kotlin
- Javalin
- TabooLib
- Sa-Token
- React
- Next.Js
- Auth.Js
- Python
- Flask

## 目录架构

- web/oihi：前端部分，使用 React、Next.js 和 Auth.js，负责用户界面的展示和用户认证
- python/bupi：Python + Flask，后端部分，使用 Python 和 Flask，负责存储用户会话和消息，并与 OpenAI API 交互
- security：鉴权和用户信息存储模块，管理数据库中的用户信息及权限，使用 Kotlin + Javalin + TabooLib + Sa-Token

## 安装要求

- Git：版本控制工具
- Docker & Docker Compose：容器化工具，用于构建和运行应用

## 安装

- 通过 Git 克隆本项目

- 修改前端请求的 Security 后端的 API 地址
  编辑 `web/oihi/utils/api/api.tsx` 文件，更新 API 请求的 URL

- 配置环境变量
  编辑 `docker-compose.yml` 文件，修改 oihi 服务的 environment 环境变量，配置相关参数。

- 填写 OpenAI API Key
  编辑 python/bupi/config.json 文件，填入有效的 `OpenAI API Key`

## 运行

### 构建项目

docker compose build

### 启动服务

docker compose up

### 后台启动服务

docker compose up -d

### 停止服务

docker compose stop

