// score
let j = 0;
// Goal set
let goal1=[];
let goal2=[];
let goal3=[];
let goal4=[];
let goal5=[];
let goal6=[];
let goal7=[];
let goal8=[];
let goal9=[];
let goal10=[];

let goalset=[goal1,goal2,goal3,goal4,goal5,goal6,goal6,goal7,goal8,goal9,goal10];

let a = goal1;
let b = 1;
// Goal set end


let goalblocksize=60;
// Vector part
let s = 20;
let x = 350;
var startB; // the buttons
var timerValue = 10;
let x1 = 20;
let y1 = 270;
let x2 = 480;
// 

// let xG = 180;
// let yG = 110;

let video;
let poseNet;
let pose;
let skeleton;

let brain;
// let poseLabel = "Y";

let state = 'waiting';
let targetLabel;
let poses;

let goalX=170;
let goalY=90;

var ontheright;
var ontheleft;

function keyPressed() {
  // if (key == 't') {
  //   brain.normalizeData();
  //   brain.train({epochs: 50}, finished); 
  // } else 
  if (key == 's') {
    brain.saveData();
  } else {
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function() {
      console.log('collecting');
      state = 'collecting';
      setTimeout(function() {
        console.log('not collecting');
        state = 'waiting';
      }, 5000);
    }, 10000);
  }
}


class playerBlock {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color || 'red';
  }

  display() {
    rectMode(CENTER);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

class goalBlock {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color || 'lightgreen';
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

class shape {
  constructor(x, y, shape, blockSize) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.blockSize = blockSize;
    
    this.blocks = [];
    
    // fill the blocks array using the "shape"
  if (shape == "T") {
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y+ 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 3*this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + 3*this.blockSize, this.blockSize));
    } else 
      
      if (shape == "I") {
      this.blocks.push(new playerBlock(this.x + 3* this.blockSize, this.y + this.blockSize, this.blockSize));
    } else 
      
      if (shape == "A") {
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y + 3*this.blockSize, this.blockSize));
    }  else 
      
      if (shape == "L") {
      this.blocks.push(new playerBlock(this.x + this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y+ 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 3*this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + 3*this.blockSize, this.blockSize));
    } else 
      
      if (shape == "F") {
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y+ 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 3*this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2*this.blockSize, this.y + 3*this.blockSize, this.blockSize));
    } else 
      
      if (shape == "O") {
      this.blocks.push(new playerBlock(this.x + this.blockSize, this.y+ 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + this.blockSize, this.y + 3*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 2* this.blockSize, this.y + 3*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 3*this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new playerBlock(this.x + 3*this.blockSize, this.y + 3*this.blockSize, this.blockSize));
    } else
      
      
      if (shape == "t") {
      this.blocks.push(new goalBlock(this.x, this.y+ this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
    } else 
      
      if (shape == "i") {
      this.blocks.push(new goalBlock(this.x, this.y, this.blockSize));
    } 
    
    else if (shape == "a") {
      this.blocks.push(new goalBlock(this.x, this.y, this.blockSize));
      this.blocks.push(new goalBlock(this.x, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x, this.y + 2*this.blockSize, this.blockSize));
    }  else 
      
      if (shape == "l") {
      this.blocks.push(new goalBlock(this.x, this.y, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y, this.blockSize));
      this.blocks.push(new goalBlock(this.x, this.y+ this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
    } else 
      
      if (shape == "f") {
      this.blocks.push(new goalBlock(this.x, this.y, this.blockSize));
      this.blocks.push(new goalBlock(this.x, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x, this.y + 2*this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y + this.blockSize, this.blockSize));
    } else 
      
      if (shape == "o") {
      this.blocks.push(new goalBlock(this.x, this.y, this.blockSize));
      this.blocks.push(new goalBlock(this.x, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + this.blockSize, this.y + this.blockSize, this.blockSize));
      this.blocks.push(new goalBlock(this.x + 2*this.blockSize, this.y , this.blockSize));
      this.blocks.push(new goalBlock(this.x + 2*this.blockSize, this.y + this.blockSize, this.blockSize));
    }
//     Goal
    
//  Goal end
  }

  display() {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].display();
    }
  }
}
// Class goal
class BuildingBackground {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color || 'white';
  }

  display() {
    rectMode(CENTER);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

    
 // fill the blocks array using the "shape"
}

// Class goal end

var myPlayer = 1;
var otherPlayerPose;


function setup() {
  createCanvas(600, 400);
  // ----
  colorMode(RGB);
  smooth();
  
  
   
// Goal set up

  let s1 = new shape(20, 270, "T", 20);
  s1.display();

  let s2 = new shape(20, 270, "I", 20);
  s2.display();
  
  let s3 = new shape(20, 270, "A", 20);
  s3.display();

  let s4 = new shape(20, 270, "L", 20);
  s4.display();
  
  let s5 = new shape(20, 270, "F", 20);
  s5.display();

  let s6 = new shape(20, 270, "O", 20);
  s6.display();

// Goal set up end
  startB = createButton("START");
  startB.position(width / 2 - 30, height + 20);
  startB.mousePressed(timerCountdown);
  // ----
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  let options = {
    input: 34,
    outputs: 6,
    task: 'classification',
    debug: true
  }
  brain = ml5.neuralNetwork(options);
  //   brain.loadData('ATIOLF.json',dataReady);
  const modelInfo = {
    model: 'public/model/model.json',
    metadata: 'public/model/model_meta.json',
    weights: 'public/model/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
  
  // twoplayer setup
  TwoPlayer.onsystem = function(data) {
    if (data.key == "room") {
      TwoPlayer.send("player1");
      document.getElementById('link').innerHTML = `<a href="${'/?roomId='+data.room}">${data.room}</a>`;
    }
  }

  TwoPlayer.ondata = function(message) {
    if (message == "player1") {
      myPlayer = 2;
      TwoPlayer.send("player2");
      document.getElementById('message').innerText = "Connected!"
    } else if (message == "player2") {
      myPlayer = 1;
      document.getElementById('message').innerText = "Connected!"
    } else {
      let data = JSON.parse(message);
      otherPlayerPose = data.pose;
    }
  }
}

function brainLoaded() {
  console.log('classification is ready!');
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 1000);
  }
}

function gotResult(error, results) {
  // console.log(results);
  // console.log(results[0].label);
  poses = results;
  classifyPose();
}

function dataReady() {
  brain.normalizeData();
  brain.train({
    epochs: 100
  }, finished);
}

function finished() {
  console.log('model trained');
  brain.save();
}

function gotPoses(poses) {
  // console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    TwoPlayer.send(JSON.stringify({pose: pose}));
    skeleton = poses[0].skeleton;
    if (state == 'collecting') {
      let inputs = [];
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }
      let target = [targetLabel];
      brain.addData(inputs, target);
    }
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function frame() {
  // ----
  for (x = 450; x < width - 50; x += s * 2) {
    fill(250, 180, 210);
    noStroke();
    heart(x + s, 40, s);
  }

  textSize(16);
  fill(200);
  noStroke();
  text('TIME', 20, 40);

  textSize(20);
  fill(0);
  noStroke();
  if (timerValue < 10) {
    text("0:0" + timerValue, 20, 70);
  } else {
    text("0:" + timerValue, 20, 70);
  }
  // if (timerValue == 0) {
  //   text('Game Over', width / 2, height / 2);
  // }

  textSize(16);
  fill(200);
  noStroke();
  text('SCORE', 110, 40);
  text(j,180,40);

  stroke(126);
  line(90, 20, 90, 75);

  player1();
  player2();
  // goal();
  // ----
}

function draw() {

  frame();

  push();
  image(video, 0, 0, video.width, video.height);
  filter(GRAY);
  pop();
  goal()
  frame();
  showgoal();
  rounds();
  
  if (pose) {
// Draw keypoint
//         for (let i = 0; i < skeleton.length; i++) {
//           let a = skeleton[i][0];
//           let b = skeleton[i][1];
//           strokeWeight(2);
//           stroke(0);

//           line(a.position.x, a.position.y, b.position.x, b.position.y);
//         }
//         for (let i = 0; i < pose.keypoints.length; i++) {
//           let x = pose.keypoints[i].position.x;
//           let y = pose.keypoints[i].position.y;
//           fill(0);
//           stroke(255);
//           ellipse(x, y, 16, 16);
//         }
// 
    if (poses && poses.length >= 2) {
      
      if (poses[0].label == 't' && pose.nose.x >300) {
        let s1 = new shape(30, 290, "T", 20);
        s1.display();
      }
      if (poses[0].label == 't' && pose.nose.x < 300) {
        let s1 = new shape(490, 290, "T", 20);
        s1.display();
      }
      
      if (poses[0].label == 'i'&& pose.nose.x > 300) {
        let s2 = new shape(30, 290, "I", 20);
        s2.display(); 
      }
      if (poses[0].label == 'i'&& pose.nose.x < 300) {
        let s2 = new shape(490, 290, "I", 20);
        s2.display();
      }

      if (poses[0].label == 'a' && pose.nose.x > 300) {
        let s3 = new shape(30, 290, "A", 20);
        s3.display();
      }
      if (poses[0].label == 'a' && pose.nose.x < 300) {
        let s3 = new shape(490, 290, "A", 20);
        s3.display();
      }
      
      if (poses[0].label == 'o' && pose.nose.x > 300) { 
       let s4 = new shape(30, 290, "O", 20);
      s4.display();
      }
      
      if (poses[0].label == 'o' && pose.nose.x < 300) {
        
        let s4 = new shape(490, 290, "O", 20);
        s4.display();
      }
      
      if (poses[0].label == 'l' && pose.nose.x > 300) {
        
        let s5 = new shape(30, 290, "L", 20);
        s5.display();
      }
      
      if (poses[0].label == 'l'&& pose.nose.x < 300) {
        
        let s5 = new shape(490, 290, "L", 20);
        s5.display();
      }
      
      if (poses[0].label == 'f' && pose.nose.x > 300) {
        let s6 = new shape(30, 290, "F", 20);
        s6.display();
      }
      
      if (poses[0].label == 'f' && pose.nose.x < 300) {
        
        let s6 = new shape(490, 290, "F", 20);
        s6.display();
      }
    }
  }
}

// 
function showgoal(){
  
  goal1.push(new shape(200+ goalblocksize, 80+ goalblocksize,"t",60));
  goal1.push(new shape(200, 80+ goalblocksize,"a",60));
  
  goal2.push(new shape(200, 80 + goalblocksize,"t",60));
  goal2.push(new shape(200 + 2*goalblocksize, 80 + goalblocksize,"i",60));
  
  goal3.push(new shape(200, 80 + goalblocksize,"a",60));
  goal3.push(new shape(200 + goalblocksize, 80 + goalblocksize,"l",60) );
  
  goal4.push(new shape(200, 80,"f",60));
  goal4.push(new shape(200+ goalblocksize, 80+ goalblocksize,"t",60));
  
  goal5.push(new shape(200+ goalblocksize, 80+ goalblocksize,"f",60));
  goal5.push(new shape(200+ 2*goalblocksize, 80+ goalblocksize,"i",60));
  
  goal6.push(new shape(200, 80+ goalblocksize,"l",60) );
  goal6.push(new shape(200+ 2*goalblocksize, 80+ goalblocksize,"i",60));
  
  goal7.push(new shape(200, 80+ 2*goalblocksize,"o",60));
  goal7.push(new shape(200+ goalblocksize, 80,"f",60) );
  
  goal8.push(new shape(200+ goalblocksize, 80,"i",60) );
  goal8.push(new shape(200+ goalblocksize, 80+ goalblocksize,"o",60) );
  
  goal9.push(new shape(200, 80,"l",60) );
  goal9.push(new shape(200, 80+ 2*goalblocksize,"o",60));
  
  goal10.push(new shape(200, 80+goalblocksize,"f",60) );
  goal10.push(new shape(200+goalblocksize, 80,"l",60));
  
  for (let i = 0; i < a.length; i++) {
    a[i].display();
  }
}

function rounds(){
  if (timerValue == 0) {
  b = b++;
  a = goalset[b++];
  print(a);
  timerValue = 10;
  }
}


// ----
function timerCountdown() {
  setInterval(function() {
    if (timerValue > 0) {
      timerValue--;
    }
  }, 1000);
}

function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}

function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 3, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 3, x, y);
  endShape(CLOSE);
}

function player1() {

  textSize(16);
  fill(0, 102, 153);
  noStroke();
  text('Player 1', x1, y1);

  stroke(100);
  noFill();
  rectMode(CORNER)
  rect(x1, y1 + 10, 100, 100);

  strokeWeight(4);
  stroke(51);
  fill(255, 30, 30);
  
}

function player2() {

  textSize(16);
  fill(0, 102, 153);
  noStroke();
  text('Player 1', 480, y1);

  stroke(100);
  noFill();
  
  rect(x2, y1 + 10, 100, 100);

  strokeWeight(4);
  stroke(51);
  fill(255, 30, 30);

}

function goal(){

  fill(255);
  rectMode(CORNER)
  rect(goalX, goalY,290,270);
}


// function losepoint{

// }

// function getpoint(){
  
// if (poses[0].label == 'a' && goal1){
//     j++;
//     }
// }


// function location() {
  
//   if (poses.length = 2){
//   text('You are ready!',300,200);
//   textSize(20);
//   fill(255,0,0);
//   }
  
//   if (poses.length < 2){
//   text('Wait for another person to get in',300,200);
//   textSize(20);
//   fll(255,0,0);