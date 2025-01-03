from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql+psycopg2://postgres:postgres@localhost:5432/db_todolistapp', echo=True)
Base = declarative_base()

connection = engine.connect()

class ToDoListModel(Base):
	__tablename__ = 'todolist'

	id = Column(Integer, primary_key=True)
	title = Column(String(90), nullable=False)
	description = Column(String)
	created_at = Column(DateTime, default=func.now())
	updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

	def __repr__(self):
		return f"Title: {self.title} - {self.created_at}"
	
	def to_dict(self):
		return {
			'id': self.id,
			'title': self.title,
			'description': self.description,
			'created_at': self.created_at,
			'updated_at': self.updated_at
		}

class ToDoListService():
	def create(self, todo_list):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			new_todolist = ToDoListModel(title=todo_list['title'], description=todo_list['description'])
		
			session.add(new_todolist)
			session.commit()
		finally:
			session.close()

	def find(self, id: int = None):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			if id:
				todolist_collection = session.query(ToDoListModel).filter_by(id=id).first()
			else:
				todolist_collection = session.query(ToDoListModel).all()
		finally:
			session.close()

		return todolist_collection
	
	def update(self, id: int, todo_list):
		Session = sessionmaker(bind=engine)
		session = Session()

		try:
			todolist_item = session.query(ToDoListModel).filter_by(id=id).first()
			print(todolist_item)

			if todolist_item:
				todolist_item.title = todo_list.title
				todolist_item.description = todo_list.description
				todolist_item.updated_at = func.now()

				session.commit()
				print(f"UPDATED TODOLIST {todolist_item.title}")

				return True

			return False
		except Exception as e:
			session.rollback()
		finally:
			print("CLOSE SESSION")
			session.close()