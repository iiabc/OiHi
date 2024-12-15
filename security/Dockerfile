# 使用一个基础的 Java 镜像
FROM openjdk:17-oracle

# 设置工作目录
WORKDIR /security

# 将本地的 JAR 文件拷贝到容器中
COPY oihi-security-1.0.0.jar /security/
COPY config.yml /security/
COPY sa-token.yml /security/
COPY wait-for-it.sh /security/

# 设置 wait-for-it.sh 文件可执行权限
RUN chmod +x /security/wait-for-it.sh

# 定义容器启动时执行的命令，使用 wait-for-it.sh 来等待 MySQL 启动完成后再启动 Jar
CMD ["/security/wait-for-it.sh", "mysql:3306", "--", "java", "-jar", "/security/oihi-security-1.0.0.jar"]