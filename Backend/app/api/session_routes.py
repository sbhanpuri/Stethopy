from flask import Blueprint, request, jsonify
from services.session_service import *
from services.audio_processing import *


session_blueprint = Blueprint('sessions', __name__)

# POST /api/sessions to create a new session
@session_blueprint.route('/', methods=['POST'])
def api_create_session():
    data = request.get_json()
    new_session = create_session(data)
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

@session_blueprint.route('/process-audio', methods=['POST'])
def process_audio():
    data = request.json.get('audio_data')

    # Process audio data (you need to implement this part)
    cleaned_audio = clean_audio(data)

    #with app.app_context():
    # Save the processed audio as a WAV file
    output_filename = 'output.wav'
    create_wave_file(cleaned_audio, output_filename)

    #now output.wav contains audio
    waveform_plot = generate_waveform_plot(output_filename)

    plot_buffer = BytesIO()
    waveform_plot.savefig(plot_buffer, format='png')
    plot_buffer.seek(0)
    plot_base64 = base64.b64encode(plot_buffer.read()).decode('utf-8')

    return jsonify({'data': output_filename, 'waveform_plot': plot_base64})