from flask import Flask
from flask_restful import Api
from Routes.todolist_api import ToDoListAPI, ToDoAPI

app = Flask(__name__)
api = Api(app)

api.add_resource(ToDoListAPI, "/todolist/<id>")
api.add_resource(ToDoAPI, "/todolist")