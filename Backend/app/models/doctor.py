from .imports import *
from .models import Base

class Doctor(Base):
    __tablename__ = 'doctors'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    specialization = Column(String(255))
    biography = Column(Text)
    education = Column(Text)
    years_of_experience = Column(Integer)
    profile_photo_id = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    availabilities = relationship("DoctorAvailability", back_populates="doctor")
    patients = relationship("DoctorPatient", back_populates="doctor")

    def __init__(self, name, specialization, biography, education, years_of_experience, profile_photo_id, created_at=None, updated_at=None):
        self.name = name
        self.specialization = specialization
        self.biography = biography
        self.education = education
        self.years_of_experience = years_of_experience
        self.profile_photo_id = profile_photo_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<Doctor(id={self.id}, name='{self.name}', specialization='{self.specialization}')>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'biography': self.biography,
            'education': self.education,
            'years_of_experience': self.years_of_experience,
            'profile_photo_id': self.profile_photo_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'availabilities': [availability.to_dict() for availability in self.availabilities],
            'patients': [patient.to_dict() for patient in self.patients]
        }
    
class DoctorAvailability(Base):
    __tablename__ = 'doctor_availability'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    day_of_week = Column(String(10))
    start_time = Column(Time)
    end_time = Column(Time)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    doctor = relationship("Doctor", back_populates="availabilities")

    def __init__(self, doctor_id, day_of_week, start_time, end_time, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.day_of_week = day_of_week
        self.start_time = start_time
        self.end_time = end_time
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<DoctorAvailability(id={self.id}, doctor_id={self.doctor_id}, day_of_week='{self.day_of_week}')>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'day_of_week': self.day_of_week,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
    
class DoctorAvailabilityExceptions(Base):
    __tablename__ = 'doctor_availability_exceptions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    date = Column(Date)
    is_available = Column(Boolean)
    reason = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    doctor = relationship("Doctor")

    def __init__(self, doctor_id, date, is_available, reason, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.date = date
        self.is_available = is_available
        self.reason = reason
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<DoctorAvailabilityExceptions(id={self.id}, doctor_id={self.doctor_id}, date='{self.date}', is_available={self.is_available})>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'date': self.date.isoformat() if self.date else None,
            'is_available': self.is_available,
            'reason': self.reason,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }