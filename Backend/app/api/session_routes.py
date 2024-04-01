from flask import Blueprint, request, jsonify
from services.session_service import *
from services.audio_processing import *
import base64



session_blueprint = Blueprint('sessions', __name__)

# POST /api/sessions to create a new session
@session_blueprint.route('/create_session', methods=['POST'])
def api_create_session():
    json_data = request.get_json()
    patient_id = json_data.get('patient_id') 
    new_session = create_session(patient_id)
    return jsonify(new_session.to_dict()), 201

# GET /api/sessions/{sessionId} to get a specific session and its associated recordings/visualizations
@session_blueprint.route('/<int:session_id>', methods=['GET'])
def api_get_session(session_id):
    session = get_session(session_id)
    if session:
        return jsonify(session.to_dict())
    return jsonify({'error': 'Session not found'}), 404

# GET /api/sessions/user/{userId} to get all sessions for a specific patient
@session_blueprint.route('/user/<int:patient_id>', methods=['GET'])
def api_get_user_sessions(patient_id):
    sessions = get_sessions_by_patient(patient_id)
    return jsonify([session.to_dict() for session in sessions])

# DELETE /api/sessions/{sessionId} to delete a session
@session_blueprint.route('/<int:session_id>', methods=['DELETE'])
def api_delete_session(session_id):
    if delete_session(session_id):
        return jsonify({'success': 'Session deleted'}), 200
    return jsonify({'error': 'Session not found'}), 404




#process_audio()