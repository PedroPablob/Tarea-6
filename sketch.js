let fireflies = [];
let button;
let startSimulation = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blendMode(ADD);

  // Botón con símbolo de recarga
  let reloadButton = createButton('⭮');
  reloadButton.position(10, 10);
  reloadButton.style('font-size', '20px'); // Ajusta el tamaño del símbolo
  reloadButton.mousePressed(reloadPage);

  button = createButton('Hazme clic');
  button.position(width / 2 - 50, height - 50);
  button.mousePressed(startSimulationFunc);
}

function draw() {
  background(0);

  if (startSimulation) {
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].move();
      fireflies[i].display();
    }
  }
}

function startSimulationFunc() {
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let hue = random(0, 360);
    let brightness = random(50, 100);
    let alpha = random(100, 200);
    // Aumenta la velocidad cambiando el rango de velocidades aleatorias
    let firefly = new Firefly(x, y, hue, brightness, alpha, random(-2, 2), random(-2, 2));
    fireflies.push(firefly);
  }
  startSimulation = true;
  button.remove();
}

class Firefly {
  constructor(x, y, hue, brightness, alpha, vx, vy) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.brightness = brightness;
    this.alpha = alpha;
    this.vx = vx; // Velocidad en el eje X
    this.vy = vy; // Velocidad en el eje Y
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }

  display() {
    colorMode(HSB, 360, 100, 100, 255);
    stroke(this.hue, 100, this.brightness, this.alpha);
    strokeWeight(3);
    point(this.x, this.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position(width / 2 - 50, height - 50);
}

function reloadPage() {
  window.location.reload();
}

