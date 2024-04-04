from models.audio_records import AudioRecords
from app import db
from services.audio_processing import process_audio
from dateutil.parser import parse
from models.session import Session


def create_audio_record(data):
    output_file_path = process_audio(data)
    recording_date = parse(data.get('recording_date'))
    # new_audio_record = AudioRecords(
    #     patient_id=data['patient_id'],
    #     file_path=output_file_path,
    #     recording_date=recording_date,
    #     recording_type=data['recording_type'],
    #     session_id=data['session_id']
    # )
    # Assuming 'session_id' is the ID you're trying to insert
    session_exists = db.session.query(db.exists().where(Session.id == data['session_id'])).scalar()
    print(f"Session_exists:{session_exists}")

    if session_exists:
        # Proceed with inserting the new audio record
        new_audio_record = AudioRecords(
        patient_id=data['patient_id'],
        file_path=output_file_path,
        recording_date=recording_date,
        recording_type=data['recording_type'],
        session_id=data['session_id']
    )
        db.session.add(new_audio_record)
        db.session.commit()
    # db.session.add(new_audio_record)
    # db.session.commit()
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
