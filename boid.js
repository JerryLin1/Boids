class Boid {
    constructor(pos) {
        this.pos = pos;
        this.vel = p5.Vector.random2D();
        this.vel.setMag(3);
        this.acc = createVector();
        this.perception = 100;
        this.maxForce = 0.1;
        this.maxSpeed = 8;
    }
    update(boids, walls) {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);

        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        let avoidWall = this.avoidWall(walls);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value()).mult(0.8);

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
        this.acc.add(avoidWall);

        if (this.pos.x > width) this.pos.x = 0;
        else if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        else if (this.pos.y < 0) this.pos.y = height;
    }
    align(boids) {
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            if (other != this) {
                if (this.pos.dist(other.pos) <= this.perception) {
                    steer.add(other.vel);
                    total++;
                }
            }
        }
        if (total > 0) {
            steer.div(total);
            steer.setMag(this.maxSpeed);
            steer.sub(this.vel)
            steer.limit(this.maxForce);
        }
        return steer
    }
    cohesion(boids) {
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            if (other != this) {
                if (this.pos.dist(other.pos) <= this.perception) {
                    steer.add(other.pos);
                    total++;
                }
            }
        }
        if (total > 0) {
            steer.div(total);

            // strokeWeight(4);
            // stroke(255, 204, 0);
            // point(steer.x, steer.y);

            steer.sub(this.pos)
            steer.setMag(this.maxSpeed);
            steer.sub(this.vel)
            steer.limit(this.maxForce);
        }
        return steer
    }
    separation(boids) {
        let steer = createVector();
        let total = 0;
        for (let other of boids) {
            if (other != this) {
                let d = this.pos.dist(other.pos);
                if (d <= this.perception) {
                    let diff = p5.Vector.sub(this.pos, other.pos);
                    diff.div(d * d);
                    steer.add(diff);
                    total++;
                }
            }
        }
        if (total > 0) {
            steer.div(total);
            steer.setMag(this.maxSpeed);
            steer.sub(this.vel)
            steer.limit(this.maxForce);
        }
        return steer
    }
    avoidWall(walls) {
        // Start line using current velocity
        // If line intersects with wall, get point
        // Add velocity in opposite direction depending on distance from point of intersection (dist from wall)

        let velVec = this.vel.copy().setMag(this.perception);
        // console.log(velVec);
        strokeWeight(2)
        stroke(255, 50);
        line(this.pos.x, this.pos.y, this.pos.x + velVec.x, this.pos.y + velVec.y);

        for (let wall of walls) {
            
        }
    }

    show() {
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y);

        noStroke();
        fill(255, 5);
        ellipse(this.pos.x, this.pos.y, this.perception * 2);
    }
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return { x, y }
}