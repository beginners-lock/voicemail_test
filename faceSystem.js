const MODEL_URI = "public/models";
const video = document.getElementById("myVideo");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URI),
]).then(startVideo)

function startVideo(){
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', ()=>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.getElementById('facerecdiv').append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    setInterval(async ()=>{
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions()
        console.log(detections);

        /*const resizeDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizeDetections);*/
    }, 100);
});
/*const img = document.getElementById('myImg');
const canvas = document.getElementById('myCanvas');


const MODEL_URL = 'public/models' //model directory

window.addEventListener('load', async ()=>{
    console.log('bro');

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL) 
    await faceapi.loadFaceLandmarkModel(MODEL_URL) // model to detect face landmark
    await faceapi.loadFaceRecognitionModel(MODEL_URL) //model to Recognise Face
    await faceapi.loadFaceExpressionModel(MODEL_URL) //model to detect face expression

    //let faceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors().withFaceExpressions()
    let faceDescriptions = await faceapi.detectAllFaces(img);
    faceapi.matchDimensions(canvas, img);
    console.log('done');
    //const detections = await faceapi.detectAllFaces(input);
    //console.log(detections);
});*/

function start(){
    let audioIN = { audio: true, video: false };

    // Access the permission for use
    // the microphone
    navigator.mediaDevices.getUserMedia(audioIN).then(function (mediaStreamObj) {

        // Connect the media stream to the
        // first audio element
        let audio = document.getElementById("audioel");
        //returns the recorded audio via 'audio' tag

        // 'srcObject' is a property which 
        // takes the media object
        // This is supported in the newer browsers
        if ("srcObject" in audio) {
            audio.srcObject = mediaStreamObj;
        }else {   // Old version
            audio.src = window.URL.createObjectURL(mediaStreamObj);
        }

        // It will play the audio
        audio.onloadedmetadata = function (ev) {
            // Play the audio in the 2nd audio
            // element what is being recorded
            audio.play();
        };

        // Stop record
        let stop = document.getElementById('stop');

        // 2nd audio tag for play the audio
        let playAudio = document.getElementById('audioel2');

        // This is the main thing to recorded 
        // the audio 'MediaRecorder' API
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        // Pass the audio stream 

        // Start event
        /*start.addEventListener('click', function (ev) {
            
        });*/

        mediaRecorder.start();
        console.log(mediaRecorder.state);

        // Stop event
        stop.addEventListener('click', function (ev) {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
        });

        // If audio data available then push 
        // it to the chunk array
        mediaRecorder.ondataavailable = function (ev) {
            dataArray.push(ev.data);
        }

        // Chunk array to store the audio data 
        let dataArray = [];

        // Convert the audio data in to blob 
        // after stopping the recording
        mediaRecorder.onstop = async function (ev) {
            // blob of type mp3
            let audioData = new Blob(dataArray, { 'type': 'audio/mp3;' });
            
            // After fill up the chunk 
            // array make it empty
            dataArray = [];
    
            // Creating audio url with reference 
            // of created blob named 'audioData'
            let audioSrc = window.URL.createObjectURL(audioData);
    
            // Pass the audio url to the 2nd video tag
            playAudio.src = audioSrc;

            let response = await fetch('http://localhost:3000/audioupload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({audiofile: audioData})
            });

            console.log(response);
            

            mediaStreamObj.getTracks().forEach(function(track) {
                track.stop();
            });
        }
    }).catch(function (err) {
        console.log(err.name, err.message);
    });
}