
song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("frozen.mp3");
}

function setup(){
    video = createCapture(VIDEO);
    video.hide();
    
    canvas = createCanvas(600, 500);
    canvas.center();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    

    if(scoreLeftWrist > 0.2){
        fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY, 20);
    play1();
    }

    if(scoreRightWrist > 0.2){
        fill("#00FF00");
    stroke("#00FF00");
    circle(rightWristX, rightWristY, 20);
    play2();
    }
}

function play1(){
    song2.stop();
    song1.stop();
    song1.play();
    song1.setVolume(0.7);
}
function play2(){
    song1.stop();
    song2.stop();
    song2.play();
    song2.setVolume(0.7);
}

function modelLoaded(){
console.log("Model has been loaded :D");
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score of left wrist is "+scoreLeftWrist+" and the score of right wrist is "+scoreRightWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left wrist x is "+leftWristX+" left wrist y is "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("right wrist x is "+rightWristX+" right wrist y is "+rightWristY);
}
}
function stop(){
    song1.stop();
    song2.stop();
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------
