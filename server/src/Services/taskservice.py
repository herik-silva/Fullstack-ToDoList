from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, func, text, insert
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
		return f"Task: {self.description} - {self.todolist_id}"
	
	def to_dict(self):
		return {
			'id': self.id,
			'description': self.description,
			'done': self.done,
			'todolist_id': self.todolist_id
		}

class TaskService():
	def create(self, task):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			stmt = (
				insert(TaskModel)
				.values(description=task['description'], todolist_id=task['todolist_id'])
				.returning(TaskModel.id)
			)

			result = session.execute(stmt)
			new_id = result.scalar()
			
			session.commit()

			return new_id
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
	
	def findByTodolist(self, id: int):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			if id:
				query = text("SELECT id, description, done, todolist_id FROM task WHERE todolist_id = :todolist_id")
				result = session.execute(query, {"todolist_id": id})

				task_collection = [
					TaskModel(id=row.id, description=row.description, done=row.done, todolist_id=row.todolist_id) for row in result
				]

				return task_collection
		finally:
			session.close()
	
	def update(self, id: int, task):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			task_item = session.query(TaskModel).filter_by(id=id).first()
			if task_item:
				task_item.description = task.description
				task_item.done = task.done

				session.commit()

				return True

			return False
		except Exception as e:
			session.rollback()
		finally:
			session.close()