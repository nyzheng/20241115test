# 使用官方的 Python 3.10 作為基礎映像
FROM python:3.10-slim

# 設置工作目錄
WORKDIR /app

# 複製當前目錄下的文件到容器的工作目錄
COPY . /app

# 安裝 Python 依賴
RUN pip install --no-cache-dir -r requirements.txt

# 曝露容器的 5000 端口
EXPOSE 5000

# 設置 Flask 應用的啟動命令
CMD ["python", "run.py"]
