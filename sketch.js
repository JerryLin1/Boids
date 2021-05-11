// Made following this video: https://www.youtube.com/watch?v=mhjuuHl6qHM& 

const flock = [];
const walls = [];
const numob = 50;
let alignSlider, cohesionSlider, separationSlider;
function setup() {
    createCanvas(windowWidth, windowHeight);
    alignSlider = createSlider(0, 10, 1, 1);
    alignSlider.position(10, 10);
    cohesionSlider = createSlider(0, 10, 1, 1);
    cohesionSlider.position(10, 40);
    separationSlider = createSlider(0, 10, 1, 1);
    separationSlider.position(10, 70);

    walls.push(new Wall(createVector(0, 0), createVector(0, height)));
    walls.push(new Wall(createVector(0, 0), createVector(width, 0)));
    walls.push(new Wall(createVector(width, height), createVector(0, height)));
    walls.push(new Wall(createVector(width, height), createVector(width, 0)));

    for (let b = 0; b < numob; b++) {
        flock.push(new Boid(createVector(random(width), random(height))))
    }
}

function draw() {

    background(0);
    for (let boid of flock) {
        boid.update(flock);

        boid.show();
    }
    noStroke()
    textSize(20);
    textAlign(LEFT, TOP)
    fill(255);
    text('Alignment', alignSlider.x * 2 + alignSlider.width, alignSlider.y);
    text('Cohesion', cohesionSlider.x * 2 + cohesionSlider.width, cohesionSlider.y);
    text('Separation', separationSlider.x * 2 + separationSlider.width, separationSlider.y);
    text(numob + " boids", 10, 100)
}