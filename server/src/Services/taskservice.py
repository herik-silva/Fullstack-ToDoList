from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql+psycopg2://postgres:postgres@localhost:5432/db_todolistapp', echo=True)
Base = declarative_base()

connection = engine.connect()

class TaskModel(Base):
	__tablename__ = 'task'

	id = Column(Integer, primary_key=True)
	description = Column(String, nullable=False)
	created_at = Column(DateTime, default=func.now())
	updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
	todolist_id = Column(Integer, nullable=False)
	done = Column(Boolean, default=False)

	def __repr__(self):
		return f"Task: {self.description} - {self.created_at}"
	
	def to_dict(self):
		return {
			'id': self.id,
			'description': self.description,
			'created_at': self.created_at,
			'updated_at': self.updated_at,
			'done': self.done,
			'todolist_id': self.todolist_id
		}

class TaskService():
	def create(self, task):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			new_task = TaskModel(description=task['description'],
			todolist_id=task['todolist_id'])
		
			session.add(new_task)
			session.commit()
		finally:
			session.close()

	def find(self, id: int = None):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			if id:
				task_collection = session.query(TaskModel).filter_by(id=id).first()
			else:
				task_collection = session.query(TaskModel).all()
		finally:
			session.close()

		return task_collection
	
	def update(self, id: int, todo_list):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			task_item = session.query(TaskModel).filter_by(id=id).first()

			if task_item:
				task_item.title = todo_list.title
				task_item.description = todo_list.description
				task_item.updated_at = func.now()

				session.commit()

				return True

			return False
		except Exception as e:
			session.rollback()
		finally:
			session.close()