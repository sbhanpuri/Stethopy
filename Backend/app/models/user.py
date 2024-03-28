from imports import * 
from models import Base

class User(Base):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True)
  username = Column(String(40), nullable=False, unique=True)
  email = Column(String(255), nullable=False, unique=True)
  password = Column(String(255), nullable=False)
  created_at = Column(DateTime)
  updated_at = Column(DateTime)
  type = Column(String(40), nullable=False)

  __mapper_args__ = {
    'polymorphic_identity':'user',
    'polymorphic_on':type
  }

  def __init__(self, username, email, type, created_at=None, updated_at=None):
    self.username = username
    self.email = email
    self.type = type
    self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
    self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

  def to_dict(self):
    return {
    'id': self.id,
    'username': self.username,
    'email': self.email,
    'type': self.type,
  }

