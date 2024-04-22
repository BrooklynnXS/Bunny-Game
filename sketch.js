
let bunny;
let carrots = []; 
let totalCarrots = 0;
let bombs = [];
let totalBombs = 0;
let score = 0;
let timer;
let gameOver = false;
let bombSpawnTimer;

function setup() {
  createCanvas(500, 400);

  timer = new Timer(300);
  timer.start();

  bunny = new Bunny(250, 200, "white");

  for (let i = 0; i < 5; i++) {
    carrots.push(new Carrot);
  }

  bombSpawnTimer = new Timer(1000); 
  bombSpawnTimer.start();
}

function draw() {
  background(209, 237, 255);

  if (!gameOver) { 
    if (totalCarrots >= carrots.length) {
      totalCarrots = 0;
    }

    if (bombSpawnTimer.isFinished()) {
      bombs.push(new Bomb());
      totalBombs++;
      bombSpawnTimer.start();
    }

    for (let i = 0; i < carrots.length; i++) {
      carrots[i].draw();
      carrots[i].move();
      if (carrots[i].byeCarrot && dist(bunny.x, bunny.y, carrots[i].x, carrots[i].y) < bunny.w / 2 + carrots[i].size / 2) {
        carrots[i].byeCarrot = false;
        score += 5;
      }
    }

    for (let i = 0; i < bombs.length; i++) {
      bombs[i].draw();
      bombs[i].move();
      if (dist(bunny.x, bunny.y, bombs[i].x, bombs[i].y) < bunny.w / 2 + bombs[i].size / 2) {
        score -= 10; 
        bombs.splice(i, 1); 
      }
    }

    if (timer.isFinished()) {
      carrots[totalCarrots] = new Carrot();
      totalCarrots ++ ;

      if (totalCarrots >= carrots.length) {
        totalCarrots = 0;
      }
      timer.start();
    }

    bunny.move();
    bunny.draw();

    // carrot counter
    fill(191, 59, 50);
    textSize(20);
    text("Points: " + score, 20, 30);

    //"gather 500"
    textSize(20);
    fill(191, 59, 50);
    text("Gather 500!", width/2 - 60, 30);
  }
  
  // Display "You Win!" message when score is 500 or more
  if (score >= 500) {
    textSize(32);
    fill(0);
    text("You win!", width / 2 - 50, height / 2);
  }
}

class Carrot {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = 20;
    this.speed = 5;
    this.byeCarrot = true;

    this.move = function() {
      this.y += this.speed;
    };
    
    this.screenBottom = function() { 
      if (this.y > height + 0) {
        return true;
      } else {
        return false;
      }
    };
  }

  draw() {
    if (this.byeCarrot) {
      fill(255, 165, 0);
      noStroke();
      triangle(this.x - 10, this.y + 50, this.x + 10, this.y, this.x - 10, this.y);

      fill(34, 139, 34);
      star(this.x, this.y, 5, 25, 5);
    }
  }
}

class Bunny {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.w = 50;
    this.h = 50;
    this.eyeSize = 5;
    this.legSize = 15;
    this.earSize = 10;
    this.innerEar = 5;
    this.cheekSize = 5;
    this.noseSize = 2.5;
    this.color = color;
    this.speed = 0;
  }

  move() {
    this.x = mouseX;
    this.y = mouseY;
  }

  draw() {
    ellipseMode(CENTER);
    rectMode(CENTER);

    // Legs
    stroke(0);
    fill(this.color);
    ellipse(this.x - this.w / 2 + 10, this.y - this.h / 3 + 10, this.legSize, this.legSize * 2);
    ellipse(this.x + this.w / 2 - 10, this.y - this.h / 3 + 10, this.legSize, this.legSize * 2);

    // Body
    fill(this.color);
    ellipse(this.x, this.y - this.h / 2, this.w, this.h);

    // Ears
    fill(this.color);
    ellipse(this.x + this.w / 3, this.y - this.h * 2 + 10, this.earSize, this.earSize * 4);
    ellipse(this.x - this.w / 3, this.y - this.h * 2 + 10, this.earSize, this.earSize * 4);

    // Inner ears
    stroke(255, 179, 188);
    fill(255, 212, 212);
    ellipse(this.x + this.w / 3, this.y - this.h * 2 + 10, this.earSize / 2, this.earSize * 3);
    ellipse(this.x - this.w / 3, this.y - this.h * 2 + 10, this.earSize / 2, this.earSize * 3);

    // Head
    stroke(0);
    fill(this.color);
    ellipse(this.x, this.y - this.h / 2 - 35, this.w - 3, this.h - 3);

    // Eyes
    stroke(0);
    fill(0);
    ellipse(this.x + this.w / 6, this.y - this.h / 2 - 35, this.eyeSize, this.eyeSize);
    ellipse(this.x - this.w / 6, this.y - this.h / 2 - 35, this.eyeSize, this.eyeSize);

    // Nose
    stroke(255, 179, 188);
    fill(255, 212, 212);
    ellipse(this.x, this.y - this.h / 2 - 25, this.noseSize, this.noseSize);

    // Cheeks
    stroke(255, 212, 212);
    fill(255, 212, 212);
    ellipse(this.x + this.w / 6 + 5, this.y - this.h / 2 - 25, this.cheekSize, this.cheekSize);
    ellipse(this.x - this.w / 6 - 5, this.y - this.h / 2 - 25, this.cheekSize, this.cheekSize);
  }
}

class Timer {
  constructor(tempTotalTime) {
    this.savedTime = 0;
    this.totalTime = tempTotalTime;

    this.start = function() {
      this.savedTime = millis();
    };
    
    this.isFinished = function() {
      let passedTime = millis()- this.savedTime;
      if (passedTime > this.totalTime) {
        return true;
      } else {
        return false;
      }
    };
  }
}


//this is literally just for the top of the carrot lol
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

class Bomb {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = 20;
    this.speed = 3;
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    fill(0);
    stroke(0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}