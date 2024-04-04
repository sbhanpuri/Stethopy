from .imports import *
from .models import Base
class Session(Base):
    __tablename__ = 'sessions'
    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey('patients.id'))
    start_time = Column(DateTime, default=datetime.datetime.now)
    end_time = Column(DateTime, default=datetime.datetime.now)
    # Relationship with AudioRecords
    audio_records = relationship("AudioRecords", backref="session")

    def __init__(self, patient_id, start_time=None, end_time=None):
        self.patient_id = patient_id
        self.start_time = start_time if start_time is not None else datetime.datetime.now()
        self.end_time = end_time

    def __repr__(self):
        return f"<Session(id={self.id}, patient_id={self.patient_id})>"

    def to_dict(self):
        return {
            'id': self.id,
            'patient_id': self.patient_id,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'audio_records': [audio_record.to_dict() for audio_record in self.audio_records]
        }