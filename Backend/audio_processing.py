import base64
import pyaudio
import wave
from flask import Flask, jsonify, request
import os
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
#import noisereduce
app = Flask(__name__)
CORS(app)


@app.route('/process-audio', methods=['POST'])
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


def generate_waveform_plot(output_filename):
    file = wave.open(output_filename, 'rb')

    sample_freq = file.getframerate()
    frames = file.getnframes()
    signal_wave = file.readframes(-1)

    file.close
    time = frames / sample_freq

    audio_array = np.frombuffer(signal_wave, dtype=np.int16)

    times = np.linspace(0, time, num=frames)

    plt.figure(figsize=(15,5))
    plt.plot(times, audio_array)
    plt.ylabel('Signal Wave')
    plt.xlabel('Time (s)')
    plt.xlim(0, time)
    plt.title('The Thing I Just Recorded!!')
    return plt

def clean_audio(data):
    # Implement your audio processing logic here
    # This function should return the processed audio data
    processed_data = data  # Placeholder, implement your logic here
    #NEED TO PUT IN PARAMETERS
    
    #noisereduce nr = nr()
    return processed_data


def create_wave_file(data, filename):
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100
    audio_bytes = base64.b64decode(data)
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(pyaudio.PyAudio().get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(audio_bytes)

    #return filename

        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)


#process_audio()