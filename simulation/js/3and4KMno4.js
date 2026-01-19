 
// ===============================================
//  GLOBALS
// ===============================================
const WIDTH = 800, HEIGHT = 600;

let canvas;
let canvasX = 0, canvasY = 0;

// Images
let image1, capImg, bgImg, dropperImg, frontFlask, liquidImg, nextBtnImg;
let gif1, gif2, gif3, gif4;

// GIF display states
let gif1Visible = false, gif2Visible = false, gif3Visible = false, gif4Visible = false;
let gif1X = 610, gif1Y = 240, gif2X = 0, gif2Y = 0, gif3X = 0, gif3Y = 0, gif4X = 0, gif4Y = 0;

// Animation states
let process1 = 0;   // cap
let process2 = -1;  // dropper move 1
let process3 = -1;  // dropper move 2
let process4 = -1;  // drops
let process5 = -1;  // next

let shownext = false;
let dropAdded = false;
let showrect = false;
let rectHeight = 50;
let increase = false;
let blinkInterval = 200;

// Positions & sizes
let capX = 560, capY = 222, capW = 55, capH = 65;
let dropX = 150, dropY = 155, dropW = 55, dropH = 160;
let nextX = 740, nextY = 540, nextW = 50, nextH = 50;

// Animation vectors
let startCap, endCap, endCap2, curCap;
let startDrop, endDrop1, endDrop2, endDrop3, endDrop4, curDrop;

let steps = 80;
let stepCount = 0;
let drops = [];

// ===============================================
//  DROP CLASS
// ===============================================
class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.radius = 2.5;
    this.active = true;
  }
  update() {
    if (this.active) {
      this.y += this.speed;
      if (this.y > 460) this.active = false;
    }
  }
  display() {
    if (this.active) {
      noStroke();
      fill(255, 255, 0, 200);
      ellipse(this.x, this.y, this.radius * 2, this.radius * 2 + 2);
    }
  }
}

// ===============================================
//  PRELOAD – Load all images
// ===============================================
function preload() {
  // Replace these with your actual image filenames
  image1       = loadImage('images/PotasiumChromate.png');
  capImg       = loadImage('images/Cap.png');
  bgImg        = loadImage('images/bg3.png');
  dropperImg   = loadImage('images/droper.png');
  frontFlask   = loadImage('images/frontflask.png');
  liquidImg    = loadImage('images/Halfwater.png');
  nextBtnImg   = loadImage('images/Forward.png');

  // GIFs (use same gif for all instructions) - Load as images
  gif1 = loadImage('images/gif1.gif');
  gif2 = loadImage('images/gif1.gif');
  gif3 = loadImage('images/gif1.gif');
  gif4 = loadImage('images/gif1.gif');
}

// ===============================================
//  SETUP
// ===============================================
function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("#container");

  // Cap vectors
  startCap = createVector(capX, capY);
  curCap   = startCap.copy();
  endCap2  = curCap.copy();

  // Dropper vectors
  startDrop = createVector(dropX, dropY);
  curDrop   = startDrop.copy();
  endDrop2  = curDrop.copy();

  gif1Visible = true; // Show first instruction
}

// ===============================================
//  DRAW
// ===============================================
function draw() {
  background(bgImg);

  // Draw GIFs on canvas
  if (gif1Visible) image(gif1, gif1X, gif1Y, 80, 80);
  if (gif2Visible) image(gif2, gif2X, gif2Y, 80, 80);
  if (gif3Visible) image(gif3, gif3X, gif3Y, 80, 80);
  if (gif4Visible) image(gif4, gif4X, gif4Y, 80, 80);

  // Draw drops
  drops.forEach(d => { d.update(); d.display(); });

  // Liquid (turns yellow after drops)
  push();
  if (dropAdded) tint(255, 255, 0);
  image(liquidImg, 400, 453, 120, 20);
  pop();

  image(frontFlask, 400, 320, 120, 160);

  // Blinking Next button
  if (shownext && (millis() % (2 * blinkInterval)) < blinkInterval) {
    image(nextBtnImg, nextX, nextY, nextW, nextH);
  }

  // Growing yellow rectangle inside dropper
  if (showrect) {
    noStroke();
    fill(255, 255, 0, 150);
    rect(curDrop.x + 22, curDrop.y + 150, 5, -rectHeight);

    if (increase && rectHeight < 70) rectHeight++;
    if (!increase && rectHeight > 0) rectHeight--;
  }

  // =================== DROPPER ANIMATION ===================
  if (process2 === 1) {
    move(curDrop, startDrop, endDrop1, () => { process2 = 2; stepCount = 0; });
  } else if (process2 === 2) {
    move(curDrop, endDrop1, endDrop2, () => {
      process2 = 3;
      dropX = curDrop.x;
      dropY = curDrop.y;
      stepCount = 0;
      process3 = 0;
      gif3Visible = true;
      gif3X = 600;
      gif3Y = 210;
    });
  } else if (process3 === 1) {
    move(curDrop, endDrop2, endDrop3, () => { process3 = 2; stepCount = 0; });
  } else if (process3 === 2) {
    move(curDrop, endDrop3, endDrop4, () => {
      process3 = 3;
      dropX = curDrop.x;
      dropY = curDrop.y;
      stepCount = 0;
      process4 = 0;
      gif4Visible = true;
      gif4X = 465;
      gif4Y = 160;
    });
  } else {
    // Static dropper
    const finalX = process3 > 0 ? endDrop4.x : endDrop2.x;
    const finalY = process3 > 0 ? endDrop4.y : endDrop2.y;
    image(dropperImg, finalX, finalY, dropW, dropH);
  }

  // KMnO4 container
  image(image1, 540, 280, 100, 160);

  // =================== CAP ANIMATION ===================
  if (process1 === 1) {
    move(curCap, startCap, endCap, () => { process1 = 2; stepCount = 0; });
  } else if (process1 === 2) {
    move(curCap, endCap, endCap2, () => {
      process1 = 3;
      stepCount = 0;
      process2 = 0;
      gif2Visible = true;
      gif2X = 178;
      gif2Y = 230;
    });
  } else {
    image(capImg, endCap2.x, endCap2.y, capW, capH);
  }
}

// ===============================================
//  MOVE HELPER
// ===============================================
function move(current, from, to, onDone) {
  const dx = (to.x - from.x) / steps;
  const dy = (to.y - from.y) / steps;

  current.x += dx;
  current.y += dy;

  // Use correct image: cap or dropper
  if (current === curCap) {
    image(capImg, current.x, current.y, capW, capH);
  } else {
    image(dropperImg, current.x, current.y, dropW, dropH);
  }

  stepCount++;
  if (stepCount >= steps) {
    current.x = to.x;
    current.y = to.y;
    onDone();
  }
}

// ===============================================
//  MOUSE CLICK
// ===============================================
function mousePressed() {
  // Cap
  if (mouseX > capX - capW/4 && mouseX < capX + capW &&
      mouseY > capY - capH/4 && mouseY < capY + capH) {
    capPressed();
  }

  // Dropper
  if (mouseX > dropX - dropW/4 && mouseX < dropX + dropW &&
      mouseY > dropY - dropH/4 && mouseY < dropY + dropH) {
    dropperPressed();
  }

  // Next button
  if (mouseX > nextX - nextW/4 && mouseX < nextX + nextW &&
      mouseY > nextY - nextH/4 && mouseY < nextY + nextH) {
    nextPressed();
  }
}

// ===============================================
//  CAP CLICK
// ===============================================
function capPressed() {
  gif1Visible = false;
  if (process1 !== 0) return;

  curCap = startCap.copy();
  endCap  = createVector(560, 212);
  endCap2 = createVector(357, 63);
  process1 = 1;
}

// ===============================================
//  DROPPER CLICK
// ===============================================
function dropperPressed() {
  gif2Visible = false;

  // 1. Move dropper up
  if (process2 === 0) {
    curDrop = startDrop.copy();
    endDrop1 = createVector(565, 100);
    endDrop2 = createVector(565, 190);
    process2 = 1;
  }

  // 2. Fill dropper (rectangle grows)
  if (process3 === 0) {
    gif3Visible = false;
    increase = true;
    showrect = true;
    endDrop3 = createVector(565, 100);
    endDrop4 = createVector(430, 142);
    process3 = 1;
  }

  // 3. Release drops
  if (process4 === 0) {
    gif4Visible = false;
    increase = false;
    for (let i = 0; i < 4; i++) {
      drops.push(new Drop(455, 200 + i * 20));
    }
    process5 = 0;
  }

  // 4. Show next button after delay
  if (process5 === 0) {
    setTimeout(showNext, 1500);
  }
}

function showNext() {
  shownext = true;
  dropAdded = true;
}

function nextPressed() {
  window.location.href = './Mytitration.html';
}
 