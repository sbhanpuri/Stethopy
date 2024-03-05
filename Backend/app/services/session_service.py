from app.models.models import db, Session

def create_session(data):
    new_session = Session(patient_id=data['patient_id'])
    db.session.add(new_session)
    db.session.commit()
    return new_session

def get_session(session_id):
    return Session.query.get(session_id)

def delete_session(session_id):
    session = get_session(session_id)
    if session:
        db.session.delete(session)
        db.session.commit()
        return True
    return False

def get_sessions_by_patient(patient_id):
    return Session.query.filter_by(patient_id=patient_id).all()
