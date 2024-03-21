from imports import *
from models import Base

class AudioVisualizations(Base):
    __tablename__ = 'audio_visualizations'
    id = Column(Integer, primary_key=True)
    audio_id = Column(Integer, ForeignKey('audio_records.id'))
    file_path = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    # Relationship
    audio_record = relationship("AudioRecords")

    def __init__(self, audio_id, file_path, created_at=None, updated_at=None):
        self.audio_id = audio_id
        self.file_path = file_path
        self.created_at = created_at if created_at is not None else datetime.datetime.now(datetime.timezone.utc)
        self.updated_at = updated_at if updated_at is not None else datetime.datetime.now(datetime.timezone.utc)

    def __repr__(self):
        return f"<AudioVisualizations(id={self.id}, audio_id={self.audio_id})>"
    
    def to_dict(self):
        return {
            'id': self.id,
            'audio_id': self.audio_id,
            'file_path': self.file_path,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
    