from flask import Blueprint, request, jsonify
from services.recording_service import *

recording_blueprint = Blueprint('recordings', __name__)

@recording_blueprint.route('/')
def api_hello_world():
    return("hello!")

# POST /api/recordings to create a new recording
@recording_blueprint.route('/', methods=['POST'])
def api_create_recording():
    data = request.get_json()
    new_recording = create_audio_record(data)
    return jsonify(new_recording.to_dict()), 201

# GET /api/recordings/{sessionId} to get all recordings for a session
@recording_blueprint.route('/<int:session_id>', methods=['GET'])
def api_get_recordings_by_session(session_id):
    recordings = get_audio_records_by_session(session_id)
    return jsonify([recording.to_dict() for recording in recordings]), 200

# PUT /api/recordings/{recordingId} to update a recording
# can be used for re-recording
@recording_blueprint.route('/<int:recording_id>', methods=['PUT'])
def api_update_recording(recording_id):
    data = request.get_json()
    updated_recording = update_audio_record(recording_id, data)
    if updated_recording:
        return jsonify(updated_recording.to_dict()), 200
    return jsonify({'error': 'Recording not found'}), 404

# DELETE /api/recordings/{recordingId} to delete a recording
@recording_blueprint.route('/<int:recording_id>', methods=['DELETE'])
def api_delete_recording(recording_id):
    if delete_audio_record(recording_id):
        return jsonify({'success': 'Recording deleted'}), 200
    return jsonify({'error': 'Recording not found'}), 404
