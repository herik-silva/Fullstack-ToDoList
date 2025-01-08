from flask_restful import Resource, reqparse
from flask import jsonify
from Services.taskservice import TaskService

parser = reqparse.RequestParser()
parser.add_argument('description', type=str)
parser.add_argument('todolist_id', type=str)
parser.add_argument('done', type=bool)

class TaskByTodolistAPI(Resource):
  def get(self, id: str):
    try:
      task_service = TaskService()
      task_collection = task_service.findByTodolist(int(id))
      print(task_collection)
      return jsonify([task.to_dict() for task in task_collection])
    
    except Exception as e:
      return {'status': 404, 'message': "Lista de afazeres vazia"}


class TaskAPI(Resource):
  def get(self, id: str):
    try:
      task_service = TaskService()
      task_collection = task_service.find(int(id))
      
      return jsonify(task_collection.to_dict())
    except:
      return {'status': 404, 'message': "Tarefa não encontrada."}
    
  def put(self, id: str):
    task_service = TaskService()
    args = parser.parse_args()

    print("\n\n")
    print("TESTE")
    print(args)
    print("\n\n")
      
    if task_service.update(id, args):
      return {'status': 200, 'message': "Tarefa atualizada!"}

    return {'status': 404, 'message': "Tarefa não encontrada."}

  
class TaskPostAPI(Resource):
  def post(self):
    task_service = TaskService()
    args = parser.parse_args()
    
    task = {
      'description': args['description'],
      'todolist_id': args['todolist_id']
    }

    try:
      id = task_service.create(task)
      print(f"ID: {id}")
    except:
      return {"status": 400, "message": "todolist_id inválido"}

    return {"status": 200, "message": "Tarefa criada!", "task_id": id}