// Made following this video: https://www.youtube.com/watch?v=mhjuuHl6qHM& 

const flock = [];
const numob = 100;
let alignSlider, cohesionSlider, separationSlider;
function setup() {
    createCanvas(windowWidth, windowHeight);
    alignSlider = createSlider(0, 5, 1, 0.1);
    alignSlider.position(10, 10);
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    cohesionSlider.position(10, 40);
    separationSlider = createSlider(0, 5, 1, 0.1);
    separationSlider.position(10, 70);

    for (let b = 0; b < numob; b++) {
        flock.push(new Boid(createVector(random(width), random(height))))
    }
}

function draw() {

    background(0);
    for (let boid of flock) {
        boid.update();
        boid.flock(flock);

        boid.show();
    }
    noStroke()
    textSize(20);
    textAlign(LEFT, TOP)
    text('Alignment', alignSlider.x * 2 + alignSlider.width, alignSlider.y);
    text('Cohesion', cohesionSlider.x * 2 + cohesionSlider.width, cohesionSlider.y);
    text('Separation', separationSlider.x * 2 + separationSlider.width, separationSlider.y);
    fill(255, 153);
}