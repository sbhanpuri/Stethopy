import pyaudio
import wave
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/process-audio', methods=['POST'])
def process_audio():
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100
    CHUNK = 1024
    RECORD_SECONDS = 5

    # Record audio
    frames = []
    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        data = stream.read(CHUNK)
        frames.append(data)

    stream.stop_stream()
    stream.close()
    p.terminate()

    # Process audio data (you need to implement this part)
    processed_data = process_audio_data(frames)

    # Save the processed audio as a WAV file
    create_wave_file(frames, "output.wav")

    return jsonify({'result': processed_data})

def process_audio_data(data):
    # Implement your audio processing logic here
    # This function should return the processed audio data
    processed_data = data  # Placeholder, implement your logic here
    return processed_data

def create_wave_file(data, filename):
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100

    with wave.open(filename, "wb") as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(pyaudio.PyAudio().get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b"".join(data))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

