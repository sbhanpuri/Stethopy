from flask import Blueprint, request, jsonify
from services.recording_service import *
from services.audio_processing import *

recording_blueprint = Blueprint('recordings', __name__)

@recording_blueprint.route('/')
def api_hello_world():
    return("hello!")

# POST /api/recordings to create a new recording
@recording_blueprint.route('/create', methods=['POST'])
def api_create_recording():
    data = request.get_json()
    # return audio_processing(data)
    new_recording = create_audio_record(data)
    return jsonify(new_recording.to_dict()), 201

# GET /api/recordings/{sessionId} to get all recordings for a session
@recording_blueprint.route('/<int:session_id>', methods=['GET'])
def api_get_recordings_by_session(session_id):
    recordings = get_audio_records_by_session(session_id)
    print("recordings: ", recordings)
    # convert recordings to list of dictionaries
    recording_dicts = []
    for recording in recordings:
        # convert recording object to dictionary
        recording_dict = recording.to_dict()
        # encode audio file as base64 string
        encoded_audio = encode_audio(recording.file_path)
        recording_dict['encoded_audio'] = encoded_audio
        # generate waveform plot
        plot = generate_waveform_plot(recording.file_path)
        recording_dict['waveform_plot'] = plot
        recording_dicts.append(recording_dict)
    print(recording_dicts)
    return jsonify(recording_dicts), 200

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
