word = "";
objects = [];
status1 = ""; 



function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    word = document.getElementById("word").value;
    image(video, 0, 0, 480, 380);
    if(status1 != "")
    {
     objectDetector.detect(video, gotResult);

     for (i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Status : Objects Detected";
         
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("#FF0000");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(objects[i].label==word) {
             document.getElementById("number_of_objects").innerHTML = "object found";
         }
         else{
            document.getElementById("number_of_objects").innerHTML = "object NOT found";
         }
     }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}