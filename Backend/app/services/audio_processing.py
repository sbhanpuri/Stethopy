import base64
import pyaudio
import wave
from flask import Flask, jsonify, request
import os
from flask_cors import CORS
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Use the Agg backend
import matplotlib.pyplot as plt
from io import BytesIO
from pathlib import Path

#import noisereduce


def process_audio(data):
    audio_data = data['audio_data']
    patient_id = data['patient_id']
    session_id = data['session_id']
    recording_type = data['recording_type']
    
    # Construct the path to the 'media/audio' directory
    media_dir = Path(__file__).parents[2] / 'media' / 'audio'
    os.makedirs(media_dir, exist_ok=True)  # Ensure the directory exists

    # Create the filename
    filename = f"{patient_id}_{session_id}_{recording_type}.wav"
    
    # Full path for the output file
    output_file_path = media_dir / filename


    # Process audio data (you need to implement this part)
    cleaned_audio = clean_audio(audio_data)

    #with app.app_context():
    # Save the processed audio as a WAV file
    create_wave_file(cleaned_audio, output_file_path)

    #now output.wav contains audio
    waveform_plot = generate_waveform_plot(output_file_path)

    plot_buffer = BytesIO()
    waveform_plot.savefig(plot_buffer, format='png')
    plot_buffer.seek(0)
    plot_base64 = base64.b64encode(plot_buffer.read()).decode('utf-8')

    return str(output_file_path)
    # return jsonify({'data': output_filename, 'waveform_plot': plot_base64})


def generate_waveform_plot(output_filename):
    output_filename = str(output_filename)
    # file = wave.open(output_filename, 'rb')

    # sample_freq = file.getframerate()
    # frames = file.getnframes()
    # signal_wave = file.readframes(-1)

    # file.close
    with wave.open(output_filename, 'rb') as file:
        sample_freq = file.getframerate()
        frames = file.getnframes()
        signal_wave = file.readframes(frames)

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

    filename = str(filename)

    with wave.open(filename, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(pyaudio.PyAudio().get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(audio_bytes)

    #return filename

        


#process_audio()