from flask_restful import Resource, reqparse
from flask import jsonify
from Services.taskservice import TaskService

parser = reqparse.RequestParser()
parser.add_argument('description', type=str)
parser.add_argument('todolist_id', type=str)

class TaskAPI(Resource):
  def get(self, id: str):
    try:
      task_service = TaskService()
      task_collection = task_service.find(int(id))
      print("\n\n")
      print(task_collection)
      print("\n\n")
      
      return jsonify(task_collection.to_dict())
    except:
      return {'status': 404, 'message': "Tarefa não encontrada."}
    
  def put(self, id: str):
    task_service = TaskService()
    args = parser.parse_args()
      
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
      task_service.create(task)
    except:
      return {"status": 400, "message": "todolist_id inválido"}

    return {"status": 200, "message": "Tarefa criada!"}