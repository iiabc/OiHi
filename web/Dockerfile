# 使用支持 Node.js 18 的基础镜像
FROM node:18-alpine

# 设置工作目录为 /web/oihi
WORKDIR /web/oihi

# 启用 corepack 并安装 pnpm
RUN corepack enable pnpm

# 将 pnpm-lock.yaml 复制到容器中，并下载依赖（使用 pnpm fetch 来提高构建效率）
COPY oihi/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm fetch

# 复制 package.json 并安装依赖
COPY oihi/package.json ./package.json
RUN pnpm install --offline

# 复制项目的其他文件
COPY oihi/ .

# 直接复制本地的 .env.local 文件到容器中
COPY .env.local /web/.env.local

# 构建 Next.js 应用
RUN pnpm build

# 清理 devDependencies 以减少镜像大小
RUN pnpm prune --prod

# 暴露端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["pnpm", "start"]
