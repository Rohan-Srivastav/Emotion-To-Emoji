Webcam.set({

    width:350,
    height:300, 
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function snap()
{

    Webcam.snap(function(image){

        document.getElementById("result").innerHTML = '<img id = "captured_image"  src="'+image+'">';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Cl82VYYia/model.json',modelLoaded);


function modelLoaded() {
    console.log('Model Loaded! 😁😁');
}


function speak(){

    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + prediction_1;
    speak_data_2 = "The Second Prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function predict(){

    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);

}

function gotResult(error, results) {

    if (error) {

        console.error(error);
    }

    else {

        console.log(results);

        document.getElementById("emotion_1").innerHTML = results[0].label;
        document.getElementById("emotion_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Happy")
        {

            document.getElementById("update_emoji_1").innerHTML = "&#128522;";
        }

        if(results[0].label == "Sad")
        {

            document.getElementById("update_emoji_1").innerHTML = "&#128532;";
        }

        if(results[0].label == "Angry")
        {

            document.getElementById("update_emoji_1").innerHTML = "&#128548;";
        }



        //Setting Emoji For Second Tag


        if(results[1].label == "Happy")
        {

            document.getElementById("update_emoji_2").innerHTML = "&#128522;";
        }

        if(results[1].label == "Sad")
        {

            document.getElementById("update_emoji_2").innerHTML = "&#128532;";
        }

        if(results[1].label == "Angry")
        {

            document.getElementById("update_emoji_2").innerHTML = "&#128548;";
        }

    }
}