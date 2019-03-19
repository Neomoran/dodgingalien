//15th Mar 2019
//FlappyAlien Game

// The Logic
/*
//create canvas in the html with id of canvas width as 288 and height 512
//we use js to create games where we just draw images to the canvas continuously and changing their positions.
//We shall first select our canvas using the document.getElementById('canvas'). We dont have to write this line everytime, therefore we assign it to a variable like
  # let cvs = document.getElementById('canvas');
  //Then using the getContext('2d') which gives us a lot of methods and properties, that gives as access to the canvas to draw  or write anything we want i.e
  # getContext('2d');
  //We attach it to our canvas and assign it as a new variable  ctx i.e
  # let ctx = cvs.getContext('2d');

  //Loading Images
  //Then we have to load the images by
  # let imageName = new Image();
  //Then we give the image name a source i.e
  # imageName.src ="imgs/image1.png";
  //Same thing to audio when we need to add an audio file.
  # let audioName = new Audio();
  # audioName.src ="audio/audio1.mp4";

  //Drawing Images
 //Using the drawImage() that takes alot of arguments; for our case lets use five arguments; imageName, x, y(positions), width and height.
  # ctx.drawImage(imageName, X, Y, Width and Height);
  e.g
  # ctx.drawImage(our bird Image, 100px for X position, 150px for the Y position with width as 50 and height as 50)
  # ctx.drawImage(image,100,150,50,50);
  //Check screenshot for the positions

  //To change the position of the bird, we just have to change the values of the x and y positions.

  //Drwaing Images to the Canvas
  //We use everything inside the fx called draw()
  # function draw(){
      //drawing the background
      //0,0 for both x and y positions and not giving the width and height because the images heights and width are already set using ps.
      # ctx.drawImage(bg,0,0);
      //Check screenshot for the display

      //Next we draw the top pipe as pipeNorth image that has pX and PY as its X and Y positions.
      # ctx.drawImage(pipeNorth,pX,pY);
      //Check screenshot for the pipe North

      //Next we draw the bottom pipe as pipeSouth
      //Has the same pX as the pipe North but different pY where add a constant. The constant is the pipe height plus the gap
      # ctx.drawImage(pipeSouth,pX,pY+Const);
      //Check screenshot for pic.

      //Now we draw the front ground. It has a 0 position and a y position as cvs.height-fg.height
      # ctx.drawImage(fg,0,cvs.height-fg.height);
      //Check screenshot for that.
      //Our foreground will be somehere at the bottom
      //check the screenshot for the fg.height

      /Next we draw our bird, which has both the x and y positions as bX and bY
      # ctx.drawImage(bird,bX,bY);
      //Check screen for the position of bird.
      //We have to draw the bird continuously using a callback fx which is the requetAnimationFrame(draw); It calls the draw fx.

      # requestAnimationFrame(draw);
      //Therefore the draw() runs again and again in a loop.
      //We just have to call the draw() once outside the brackets

      on the bY position, our bird goes down by gravity. The gravity is a number and we increment the bY position by that number
  //When our player presses the key on the key board, our bird goes up therefore we decrement the bY position.
  //Check the screenshot for the above info for gravity and alternate positions of bY

  # bY += gravity;
  //The gravity may equal to 1, 2 or 1.5
  //On key down event, we will decrement the bY position by 20 but we can change it in our game
  # bY -= 20;

  }
  # draw();

  //For our game we shall need a lot of pipes
  //Let set the pipe to an array
  # let pipe =[];
  //We shall initiate the pipe using this coordinates;
  # pipe[0] = {
      x:cvs.width,
      y:0
  };

  //Now inside the draw(), we shall use the for loop to loop all over the pipe array
  # for(i=0;i<pipe.length;i++){
      //We shall draw the pipeNorth and its position is the pipe[i].x, and its y position is the pipe[i].y
      # ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
      //For pipe south;
      # ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+Const);
      //To move the pipes
      # pipe[i].x--;
      //Our pipe goes from right to the left
      //Check screenshot for the pipe directions

      //So if our pipe reaches that left position from the margin of the canvas width, we have to add new coordinates to our pipe array;
      # if(pipe[i].x ==cvx.width -188){
          pipe.push(
          x:cvs.width,
          //for y, we use the random function
          y:Math.floor(Math.random()*pN.height) - pN.height
          //NOTE pN is pipeNorth
          );
          //We shall now get new pipes, check screenshot for the new pipes position
      }

  }

  //Setting our game over rules.
  //check screenshot for the positions

  //18th Mar 2019
  //It is game over if our bird touches the front of the pipe which means the bX + bird.width is greater or equal to pX

  # if
  bX >= Px (First rule)
  &&
  bX + bird.width <= px + pipe.width (second rule)
  &&
  (bY <= pY = pipe.height || bY + bird.height > = pY + const)
  ||
  bY + bird.height >= cvs.height - fg.height
  //check screenshot for the game over rules 

  
*/

//The code
//alert("Hey Ray");

let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// some variables

let gap = 120;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "audio/fly.mp3";
scor.src = "audio/score.mp3";

// on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;
  fly.play();
}

// pipe coordinates

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision

    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }

  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#333";
  ctx.font = "20px Verdana";
  ctx.fillText("Your score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

draw();

