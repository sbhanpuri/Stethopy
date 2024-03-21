from imports import *
from models import Base

class Patient(Base):
    __tablename__ = 'patients'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    gender = Column(String(50))
    dob = Column(DateTime)
    pre_existing_conditions = Column(Text)
    blood_type = Column(String(2))
    weight = Column(Float)
    height = Column(Float)
    profile_photo_id = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctors = relationship("DoctorPatient", back_populates="patient")
    sessions = relationship("Session", backref="patient")

    def __init__(self, name, gender, dob, pre_existing_conditions, blood_type, weight, height, profile_photo_id, created_at=None, updated_at=None):
        self.name = name
        self.gender = gender
        self.dob = dob
        self.pre_existing_conditions = pre_existing_conditions
        self.blood_type = blood_type
        self.weight = weight
        self.height = height
        self.profile_photo_id = profile_photo_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<Patient(id={self.id}, name='{self.name}')>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'gender': self.gender,
            'dob': self.dob.isoformat() if self.dob else None,
            'pre_existing_conditions': self.pre_existing_conditions,
            'blood_type': self.blood_type,
            'weight': self.weight,
            'height': self.height,
            'profile_photo_id': self.profile_photo_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'sessions': [session.to_dict() for session in self.sessions]
        }
