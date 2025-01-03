from routes import app
from enum import Enum

class ServerConfig(Enum):
  HOST = "0.0.0.0"
  PORT = 5000

if __name__ == "__main__":
  app.run(debug=True, host=ServerConfig.HOST.value, port=ServerConfig.PORT.value)