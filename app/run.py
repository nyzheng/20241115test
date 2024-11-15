from flask import Flask
from routes import init_app  # 匯入 Blueprint

app = Flask(__name__)
init_app(app)

if __name__ == "__main__":
    # app.run(debug=True, port=5000)
    app.run(host='0.0.0.0', port = 5000)

