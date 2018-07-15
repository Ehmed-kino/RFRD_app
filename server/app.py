#!flask/bin/python
from flask import Flask
from flask_cors import CORS

from todo import todo_api

app = Flask(__name__)
app.register_blueprint(todo_api)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
