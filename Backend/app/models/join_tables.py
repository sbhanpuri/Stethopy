from .imports import *
from .models import Base

class DoctorPatient(Base):
    __tablename__ = 'doctor_patient'
    id = Column(Integer, primary_key=True, autoincrement=True)
    doctor_id = Column(Integer, ForeignKey('doctors.id'))
    patient_id = Column(Integer, ForeignKey('patients.id'))
    relationship_start_date = Column(DateTime)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationships
    doctor = relationship("Doctor", back_populates="patients")
    patient = relationship("Patient", back_populates="doctors")

    def __init__(self, doctor_id, patient_id, relationship_start_date, created_at=None, updated_at=None):
        self.doctor_id = doctor_id
        self.patient_id = patient_id
        self.relationship_start_date = relationship_start_date
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<DoctorPatient(id={self.id}, doctor_id={self.doctor_id}, patient_id={self.patient_id})>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'doctor_id': self.doctor_id,
            'patient_id': self.patient_id,
            'relationship_start_date': self.relationship_start_date.isoformat() if self.relationship_start_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
