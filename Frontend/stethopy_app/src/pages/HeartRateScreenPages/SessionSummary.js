import React from 'react';
import { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { useState } from 'react';
import BottomTabNavigator from '../../components/BottomTabNavigator';
import BannerImage from '../../components/images/HeartAndBanner.png';
import axios from 'axios';
// import base64 from 'react-native-base64';
import base64 from 'base64-js';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';


// import { decode } from 'base64-arraybuffer';



// import audio_processing from '../../../../../Backend/app/services/audio_processing.py';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

function getTime() {
  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();
  return showTime;
}

// const decodeAudio = (base64Audio) => {
//   // Decode the base64 audio
//   const audioBytes = base64.decode(base64Audio);

//   // Create a Blob object from the audio array
//   const audioBlob = new Blob([audioBytes], { type: 'audio/mpeg' });

//   // Create an object URL from the Blob
//   const audioUrl = URL.createObjectURL(audioBlob);

//   // Return the audio URL
//   return audioUrl;
// }

async function playbackEncodedDecodedAudio(encodedAudio) {
  try {
    // Decode the Base64-encoded audio to binary (array buffer)
    const decodedAudio = base64.toByteArray(encodedAudio);

    // Write the decoded audio to a temporary file for playback
    const newPath = FileSystem.documentDirectory + 'tempDecodedAudio.wav'; // Adjust the file extension if necessary
    await FileSystem.writeAsStringAsync(newPath, base64.fromByteArray(decodedAudio), { encoding: FileSystem.EncodingType.Base64 });
9
    // Create and play back the audio from the file
    const playbackObject = new Audio.Sound();
    await playbackObject.loadAsync({ uri: newPath });
    await playbackObject.playAsync();
  } catch (error) {
    console.error('Error during audio playback:', error);
  }
}


// // Now you can use audioUrl as the src attribute of an audio element
// let audioElement = document.createElement('audio');
// audioElement.src = audioUrl;
// document.body.appendChild(audioElement);
// audioElement.play();

const SessionSummary = ({ navigation, route }) => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [currentTime, setCurrentTime] = useState(getTime());
  const [waveformPlot1, setWaveformPlot1] = useState(null);
  const [waveformPlot2, setWaveformPlot2] = useState(null);
  const [waveformPlot3, setWaveformPlot3] = useState(null);
  const [waveformPlot4, setWaveformPlot4] = useState(null);
  const [audioDictionary, setAudioDictionary] = useState({}); // Use useState for audioDictionary
  const [waveformPlotDictionary, setWaveformPlotDictionary] = useState({}); // Use useState for waveformPlotDictionary
  const { sessionId } = route.params;
  console.log('Session ID:', sessionId);


  // useEffect(() => {
  //   // Assuming you want to do something with audioDictionary here
  //   // This example just logs the current state
  //   // console.log(audioDictionary);
  // }, [audioDictionary]);
  

  
  // 'id': self.id,
  // 'patient_id': self.patient_id,
  // 'file_path': self.file_path,
  // 'recording_date': self.recording_date.isoformat(),
  // 'recording_type': self.recording_type,
  // 'session_id': self.session_id,
  // 'created_at': self.created_at.isoformat(),
  // 'updated_at': self.updated_at.isoformat(),
  // 'encoded_audio': self.encoded_audio,
  // 'waveform_plot': self.waveform_plot,

  // how the audio is encoded
  // def encode_audio(file_path):
  //   with open(file_path, 'rb') as audio_file:
  //       audio_bytes = audio_file.read()
  //   base64_audio = base64.b64encode(audio_bytes).decode('utf-8')
  //   return base64_audio

  // how the waveform plot is created
  // def generate_waveform_plot(output_filename):
  //   output_filename = str(output_filename)
  //   # file = wave.open(output_filename, 'rb')

  //   # sample_freq = file.getframerate()
  //   # frames = file.getnframes()
  //   # signal_wave = file.readframes(-1)

  //   # file.close
  //   with wave.open(output_filename, 'rb') as file:
  //       sample_freq = file.getframerate()
  //       frames = file.getnframes()
  //       signal_wave = file.readframes(frames)

  //   time = frames / sample_freq

  //   audio_array = np.frombuffer(signal_wave, dtype=np.int16)

  //   times = np.linspace(0, time, num=frames)

  //   plt.figure(figsize=(15,5))
  //   plt.plot(times, audio_array)
  //   plt.ylabel('Signal Wave')
  //   plt.xlabel('Time (s)')
  //   plt.xlim(0, time)
  //   plt.title('The Thing I Just Recorded!!')
  //   return plt

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.193.136.224:5000/recordings/${sessionId}`);
      // const audios = Object.values(response.audio_records)
      // list of audio recordings as dict 
      const arrayOfAudioRecords = response.data;
      console.log("about to print array")
      console.log(response.data);
      for (let i = 0; i < arrayOfAudioRecords.length; i++) {
        const item = arrayOfAudioRecords[i];
        // const audioUrl = decodeAudio(item.encoded_audio);
        const recording_type = item.recording_type;
        if (recording_type == 1) {
          setWaveformPlot1(item.waveform_plot);
        } else if (recording_type == 2) {
          setWaveformPlot2(item.waveform_plot);
        } else if (recording_type == 3) {
          setWaveformPlot3(item.waveform_plot);
        } else if (recording_type == 4) {
          setWaveformPlot4(item.waveform_plot);
        }
        audioDictionary[recording_type] = item.encoded_audio;
        waveformPlotDictionary[recording_type] = item.waveform_plot;
      
        
        // playbackEncodedDecodedAudio(item.encoded_audio);
        // audioDictionary[recording_type] = audioUrl;
        // console.log(item); 
    }
      // console.log(item); 
      console.log(waveformPlotDictionary.size);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };



  // ...



  //   for (const recordingType in audioDictionary) {
  //     const audioUrl = audioDictionary[recordingType];
  //     const graph = audioDictionary[plot];
  //     setWaveformPlot(graph);

  //   }
  // }, [audioDictionary]);

  // ...

  useEffect(() => {
    fetchData(); // Fetch data on component mount

  }, []); // Empty dependency array means this runs once on component mount
  
  // fetchData();

  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Session Date: {currentDate}
      </Text>
      <Text style={styles.subtitle}>
        {'\n'}
        Session Time: {currentTime}
      </Text>
      <Image 
        source={BannerImage}
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HeartRateScreen');
          console.log('You tapped the button!');
        }}
        style={styles.customButton2}
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      
      {/* This is the new container for buttons and graphs */}
    
      <ScrollView style={styles.sessionContent}>
        {Object.keys(audioDictionary).map((recordingType) => (
          <View key={recordingType} style={styles.sessionRow}>
            <TouchableOpacity onPress={() => playbackEncodedDecodedAudio(audioDictionary[recordingType])} style={styles.playbackButton}>
              <Text style={styles.text}>Play {recordingType}</Text>
            </TouchableOpacity>
            {waveformPlotDictionary[recordingType] && (
              <Image
                source={{ uri: `data:image/png;base64,${waveformPlotDictionary[recordingType]}` }}
                style={styles.plot}
              />
            )}
          </View>
        ))}
      </ScrollView>
      
      <BottomTabNavigator></BottomTabNavigator>
    </View>
  );  
};



const styles = StyleSheet.create({

  scrollViewContent: {
    // alignItems: 'center',
    top: '13%',
    maxHeight: '20%',
  },
  plot: {
    width: 300, 
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: 'white', // Change the background color as needed
    // overflowX: 'hidden',
  },
  title: {
    fontSize: 24, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold',
    color: '#C42021',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: -100,
  },
  subtitle: {
    fontSize: 20, // Change the font size as needed
    marginBottom: 20, // Adjust spacing between title and button
    fontFamily: 'HelveticaNeue-Thin',
    fontWeight: 'bold',
    color: '#C42021',
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: -100,
  },
  customButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 20,
    padding: 10,
    width: 150,
  },
  customButton2: {
    backgroundColor: '#9fc5e8',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    width: 150,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: 500,
    height: 300,
    marginTop: 145,
    marginBottom: -150,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
  },
  sessionContent: {
    // Style for the overall container
    flex: 1,
    marginTop: "45%",
    maxHeight: '40%',
    marginLeft: '10%',
    marginBottom: '27%',
    maxWidth: '100%',
    // overflowX: 'hidden',
    // overflowY: 'auto',
  },
  sessionRow: {
    // Style for each row containing a button and a graph
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginBottom: 20, // Add space between rows
  },
  playbackButton: {
    // Style for the playback button
    marginRight: 10, // Add space between the button and the graph
    padding: 10,
    backgroundColor: '#9fc5e8', // Example background color
    borderRadius: 5,
    // Width can be a fixed value or percentage, depending on your design
    width: '20%',
    height: '100%',
    //width: 50, // Smaller width
    //height: 50, // Smaller height
    borderRadius: 35, // Adjusted for the smaller size to keep it circular
    borderWidth: 1,
    // alignContent:'center',
    // textAlign: "center",
  },
  plot: {
    // Style for the waveform plot image
    width: '70%', // Set width to take remaining space
    height: '200%', // Set a fixed height for the image
    resizeMode: 'contain', // Keep the aspect ratio of the image
  },
  recordButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50, // Smaller width
    height: 50, // Smaller height
    borderRadius: 35, // Adjusted for the smaller size to keep it circular
    backgroundColor: 'white',
    marginTop: 15, // Example to move the button down from the top of its container
    marginLeft: 40,
    borderWidth: 1, // Width of the border
    borderColor: 'black',
    },
    text: {
      fontWeight: '700',
    }, 
});

export default SessionSummary;