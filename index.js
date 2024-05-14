import express, { response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as fs from 'fs';
import OpenAI from 'openai';
import { AssemblyAI } from 'assemblyai'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

//import '@tensorflow/tfjs-node';
import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';


dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const assemblyai = new AssemblyAI({
  apiKey: "4700b6819a18478faff64c937f1060e9"
});

app.use( cors({ origin: '*' }) );
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;

/*let reader = new FileReader();
reader.readAsDataURL('https://firebasestorage.googleapis.com/v0/b/printfolio-firebase-3295a.appspot.com/o/facerecdata%2Famy%2Famy1.png?alt=media&token=a6291843-f203-4c20-954c-caee02f3574f').then(response => {
    console.log(response);
});*/
//console.log(img.json());

//await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');

app.post('/audioupload', async (req, res) => {
    let blob = req.body.audiofile;
    console.log(blob);
    //console.log(blob.buffer());
    //fs.writeFileSync('public/sound.mp3', );
    //res.sendStatus(200);
});

app.get('/', (req, res) => {
    console.log('>>Connection Detected');
    res.send('>>Connection Detected!');
});

app.listen(port, () => {
    console.log(`Express server is listening at http://localhost:${port} 🚀`);
});



/*const audioUrl = "https://firebasestorage.googleapis.com/v0/b/paperprints-firebase.appspot.com/o/files%2Fsample1.m4a?alt=media&token=8310607a-ccf3-41e0-a007-fdc081038214";
  //'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

const config = {
    audio_url: audioUrl
}

const run = async () => {
    console.log('yeahhhh');
    const transcript = await assemblyai.transcripts.transcribe(config);
    console.log(transcript.text)
}

run();*/