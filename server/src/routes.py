from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from Routes.todolist_api import ToDoListAPI, ToDoAPI
from Routes.task_api import TaskAPI, TaskPostAPI

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(ToDoListAPI, "/todolist/<id>") # buscar, atualizar e deletar
api.add_resource(ToDoAPI, "/todolist") # buscar tudo e criar
api.add_resource(TaskAPI, "/task/<id>") # buscar, atualizar e deletar
api.add_resource(TaskPostAPI, "/task") # criar  