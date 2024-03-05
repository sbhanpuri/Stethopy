from app.models.models import db, AudioRecords

def create_audio_record(data):
    new_audio_record = AudioRecords(
        patient_id=data['patient_id'],
        file_path=data['file_path'],
        recording_date=data.get('recording_date'),
        recording_type=data['recording_type'],
        session_id=data['session_id']
    )
    db.session.add(new_audio_record)
    db.session.commit()
    return new_audio_record

def get_audio_records_by_session(session_id):
    return AudioRecords.query.filter_by(session_id=session_id).all()

def update_audio_record(record_id, data):
    audio_record = AudioRecords.query.get(record_id)
    if audio_record:
        audio_record.file_path = data.get('file_path', audio_record.file_path)
        audio_record.recording_date = data.get('recording_date', audio_record.recording_date)
        audio_record.recording_type = data.get('recording_type', audio_record.recording_type)
        db.session.commit()
        return audio_record
    return None

def delete_audio_record(record_id):
    audio_record = AudioRecords.query.get(record_id)
    if audio_record:
        db.session.delete(audio_record)
        db.session.commit()
        return True
    return False
