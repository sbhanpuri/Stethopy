from flask import Blueprint, request, jsonify
from app.models.models import db, Session, AudioRecords, AudioVisualizations  
from app.services.session_service import *
from app.services.recording_service import *
from app.services.visualization_service import *
import datetime

api_blueprint = Blueprint('api', __name__)

# POST /api/sessions to create a new session
@api_blueprint.route('/api/sessions', methods=['POST'])
def api_create_session():
    data = request.get_json()
    new_session = create_session(data)
    return jsonify(new_session.to_dict()), 201

# GET /api/sessions/{sessionId} to get a specific session and its associated recordings/visualizations
@api_blueprint.route('/api/sessions/<int:session_id>', methods=['GET'])
def api_get_session(session_id):
    session = get_session(session_id)
    if session:
        return jsonify(session.to_dict())
    return jsonify({'error': 'Session not found'}), 404

# GET /api/sessions/user/{userId} to get all sessions for a specific patient
@api_blueprint.route('/api/sessions/user/<int:patient_id>', methods=['GET'])
def api_get_user_sessions(patient_id):
    sessions = get_sessions_by_patient(patient_id)
    return jsonify([session.to_dict() for session in sessions])

# DELETE /api/sessions/{sessionId} to delete a session
@api_blueprint.route('/api/sessions/<int:session_id>', methods=['DELETE'])
def api_delete_session(session_id):
    if delete_session(session_id):
        return jsonify({'success': 'Session deleted'}), 200
    return jsonify({'error': 'Session not found'}), 404

# POST /api/recordings to create a new recording
@api_blueprint.route('/api/recordings', methods=['POST'])
def api_create_recording():
    data = request.get_json()
    new_recording = create_audio_record(data)
    return jsonify(new_recording.to_dict()), 201

# GET /api/recordings/{sessionId} to get all recordings for a session
@api_blueprint.route('/api/recordings/<int:session_id>', methods=['GET'])
def api_get_recordings_by_session(session_id):
    recordings = get_audio_records_by_session(session_id)
    return jsonify([recording.to_dict() for recording in recordings]), 200

# PUT /api/recordings/{recordingId} to update a recording
# can be used for re-recording
@api_blueprint.route('/api/recordings/<int:recording_id>', methods=['PUT'])
def api_update_recording(recording_id):
    data = request.get_json()
    updated_recording = update_audio_record(recording_id, data)
    if updated_recording:
        return jsonify(updated_recording.to_dict()), 200
    return jsonify({'error': 'Recording not found'}), 404

# DELETE /api/recordings/{recordingId} to delete a recording
@api_blueprint.route('/api/recordings/<int:recording_id>', methods=['DELETE'])
def api_delete_recording(recording_id):
    if delete_audio_record(recording_id):
        return jsonify({'success': 'Recording deleted'}), 200
    return jsonify({'error': 'Recording not found'}), 404

# POST /api/visualizations to create a visualization for a recording
@api_blueprint.route('/visualizations', methods=['POST'])
def create_visualization_route():
    data = request.get_json()
    new_visualization = create_visualization(data)  # Use the service function
    return jsonify(new_visualization.to_dict()), 201

# GET /api/visualizations/{sessionId} to get all visualizations for a session
@api_blueprint.route('/visualizations/<int:session_id>', methods=['GET'])
def get_visualizations_by_session_route(session_id):
    visualizations = get_visualizations_by_session(session_id)  # Use the service function
    return jsonify([visualization.to_dict() for visualization in visualizations]), 200
