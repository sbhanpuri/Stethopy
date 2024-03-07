from app.models.models import db, AudioVisualizations, AudioRecords

def create_visualization(data):
    new_visualization = AudioVisualizations(
        audio_id=data['audio_id'],
        file_path=data['file_path']
    )
    db.session.add(new_visualization)
    db.session.commit()
    return new_visualization

def get_visualizations_by_session(session_id):
    visualizations = AudioVisualizations.query.join(AudioRecords).filter(AudioRecords.session_id == session_id).all()
    return visualizations

