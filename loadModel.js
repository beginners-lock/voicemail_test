const MODEL_URL = '/models' //model directory

await faceapi.loadSsdMobilenetv1Model(MODEL_URL) 
await faceapi.loadFaceLandmarkModel(MODEL_URL) // model to detect face landmark
await faceapi.loadFaceRecognitionModel(MODEL_URL) //model to Recognise Face
await faceapi.loadFaceExpressionModel(MODEL_URL) //model to detect face expression