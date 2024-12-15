# 使用官方 Python 镜像
FROM python:3.11-slim

# 设置工作目录
WORKDIR /bupi

# 复制项目文件到容器
COPY ./bupi /bupi

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 设置容器启动命令
CMD ["python", "run.py"]
