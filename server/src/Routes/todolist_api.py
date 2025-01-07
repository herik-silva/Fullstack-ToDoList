from flask_restful import Resource, reqparse
from flask import jsonify
from Services.todolistservice import ToDoListService

parser = reqparse.RequestParser()
parser.add_argument('title', type=str)
parser.add_argument('description', type=str)

class ToDoListAPI(Resource):
  def get(self, id: str):
    try:
      todolist_service = ToDoListService()
      todolist_collection = todolist_service.find(int(id))
      
      return jsonify(todolist_collection.to_dict())
    except:
      return {'status': 404, 'message': "lista de afazeres não encontrada."}
    
  def put(self, id: str):
    todolist_service = ToDoListService()
    args = parser.parse_args()
      
    if todolist_service.update(id, args):
      return {'status': 200, 'message': "Lista de afazeres atualizada!"}

    return {'status': 404, 'message': "lista de afazeres não encontrada."}

  
class ToDoAPI(Resource):
  def post(self):
    todolist_service = ToDoListService()
    args = parser.parse_args()
    
    todolist = {
      'title': args['title'],
      'description': args['description']
    }

    new_todolist_id = todolist_service.create(todolist)

    return {"status": 200, "message": "Lista de afazeres criada!", "id": new_todolist_id}
  
  def get(self):
    todolist_service = ToDoListService()
    todolist_collection = todolist_service.find()
    
    return jsonify([todolist.to_dict() for todolist in todolist_collection])