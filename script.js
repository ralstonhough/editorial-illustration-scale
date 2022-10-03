let man;
let clock;
let clockScroll = 0;
let manScroll = 4350;
let bounceAngle = 0;

function preload() {
  man = loadImage('falling-man.png');
  clock = loadImage('clocks.png');
};

function setup() {
    createCanvas(2048,2048);
    background("black");
    translate(width / 2, height / 2);
    image(clock,0,0,30,30);
};

function draw() {
    translate(width / 2, height / 2);
    background("black");
    let bounceRad = radians(bounceAngle);

    push();
    rotate(-clockScroll/90);
    push();
    translate((cos(bounceRad)),(sin(bounceRad)));
    circleOfClocks(45, 0, 30);
    pop();
    push();
    translate((3*cos(bounceRad)),(3*sin(bounceRad)));
    circleOfClocks(105, 5, 60);
    pop();
    push();
    translate((5*cos(bounceRad)),(5*sin(bounceRad)));
    circleOfClocks(195, 10, 90);
    pop();
    push();
    translate((7*cos(bounceRad)),(7*sin(bounceRad)));
    circleOfClocks(345, 15, 180);
    pop();
    push();
    translate((8.5*cos(bounceRad)),(8.5*sin(bounceRad)));
    circleOfClocks(630, 20, 360);
    pop();
    push();
    translate((10*cos(bounceRad)),(10*sin(bounceRad)));
    circleOfClocks(1200, 25, 720);
    pop();
    pop();
    
    push();
    imageMode(CORNER);
    rotate(-manScroll/75);
    image(man, 0, 0, manScroll, manScroll);
    pop();

    bounceAngle += 2;
};

function circleOfClocks(r, angle, size){
  for(let i=0; i<6; i++){
    let x = r * sin(angle);
    let y = r * cos(angle);
    imageMode(CENTER);
    image(clock, x, y, size, size);
    
    let clockRadius = size/2;
    let secondsRadius = clockRadius * 0.8;
    let minutesRadius = clockRadius * 0.7;
    let hoursRadius = clockRadius * 0.5;
    let clockDiameter = clockRadius * 1.7;
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;
    
    stroke('red');
    strokeCap(PROJECT);
    strokeWeight(size/500);
    line(x, y, x + cos(s) * secondsRadius, y + sin(s) * secondsRadius);
    stroke(0);
    strokeWeight(size/75);
    line(x, y, x + cos(m) * minutesRadius, y + sin(m) * minutesRadius);
    strokeWeight(size/75);
    line(x, y, x + cos(h) * hoursRadius, y + sin(h) * hoursRadius);

    angle = angle + TWO_PI/6;
  };
};

function mouseWheel(event){
  print(event.delta);
  clockScroll += event.delta;
  if (manScroll > 75){
    manScroll -= (event.delta);
    return false;
  }
    else {
      manScroll = 25;
      return true;
    }
};

//Sin-based math for floating animation inspired
//by Sharvari Raut at blog.logrocket.com

//Code to make functional clock hands pilfered from p5
//example documentation