from .imports import *
from .models import Base

class AudioRecords(Base):
    __tablename__ = 'audio_records'
    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(Integer, ForeignKey('patients.id'))
    file_path = Column(String(255))
    recording_date = Column(DateTime)
    recording_type = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    session_id = Column(Integer, ForeignKey('sessions.id'))
    # Relationship
    # patient = relationship("patients")

    def __init__(self, patient_id, file_path, recording_date, recording_type, session_id, created_at=None, updated_at=None):
        self.patient_id = patient_id
        self.file_path = file_path
        self.recording_date = recording_date
        self.recording_type = recording_type
        self.session_id = session_id
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<AudioRecords(id={self.id}, patient_id={self.patient_id}, recording_type='{self.recording_type}', session_id={self.session_id})>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'file_path': self.file_path,
            'recording_date': self.recording_date.isoformat(),
            'recording_type': self.recording_type,
            'session_id': self.session_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
        }
