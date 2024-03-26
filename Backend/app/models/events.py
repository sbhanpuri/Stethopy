from .imports import *
from .models import Base


class CalendarEvents(Base):
    __tablename__ = 'calendar_events'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer)
    user_type = Column(String(50))
    date = Column(Date)
    is_available = Column(Boolean)
    reason_for_unavailability = Column(Text)
    event_type = Column(String(255))
    doctor_id = Column(Integer, ForeignKey('doctors.id'), nullable=True)
    patient_id = Column(Integer, ForeignKey('patients.id'), nullable=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctor = relationship("Doctor", foreign_keys=[doctor_id])
    patient = relationship("Patient", foreign_keys=[patient_id])

    def __init__(self, user_id, user_type, date, is_available, reason_for_unavailability, event_type, doctor_id=None, patient_id=None, created_at=None, updated_at=None):
        self.user_id = user_id
        self.user_type = user_type
        self.date = date
        self.is_available = is_available
        self.reason_for_unavailability = reason_for_unavailability
        self.event_type = event_type
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<CalendarEvents(id={self.id}, user_type='{self.user_type}', date='{self.date}')>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_type': self.user_type,
            'date': self.date.isoformat() if self.date else None,
            'is_available': self.is_available,
            'reason_for_unavailability': self.reason_for_unavailability,
            'event_type': self.event_type,
            'doctor_id': self.doctor_id,
            'patient_id': self.patient_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

class Appointments(Base):
    __tablename__ = 'appointments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    patient_id = Column(Integer, ForeignKey('patients.id'))
    doctor_patient_id = Column(Integer, ForeignKey('doctor_patient.id'))
    appointment_time = Column(DateTime)
    notes = Column(Text)
    appointment_type = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctor = relationship("Doctor")
    patient = relationship("Patient")
    doctor_patient_relation = relationship("DoctorPatient")

    def __init__(self, doctor_id, patient_id, doctor_patient_id, appointment_time, notes, appointment_type, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.doctor_patient_id = doctor_patient_id
        self.appointment_time = appointment_time
        self.notes = notes
        self.appointment_type = appointment_type
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<Appointments(id={self.id}, doctor_id={self.doctor_id}, patient_id={self.patient_id})>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'patient_id': self.patient_id,
            'doctor_patient_id': self.doctor_patient_id,
            'appointment_time': self.appointment_time.isoformat() if self.appointment_time else None,
            'notes': self.notes,
            'appointment_type': self.appointment_type,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

class Holidays(Base):
    __tablename__ = 'holidays'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    date = Column(Date)
    description = Column(Text)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, name, date, description, created_at=None, updated_at=None):
        self.name = name
        self.date = date
        self.description = description
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<Holidays(id={self.id}, name='{self.name}', date='{self.date}')>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date.isoformat() if self.date else None,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }

