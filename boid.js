class Boid {
    constructor(pos) {
        this.pos = pos;
        this.vel = p5.Vector.random2D();
        this.vel.setMag(3);
        this.acc = createVector();
        this.perception = 100;
        this.maxForce = 0.05;
        this.maxSpeed = 4;
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);

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

            strokeWeight(4);
            stroke(255, 204, 0);
            point(steer.x, steer.y);

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

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());

        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);

        this.acc.setMag(this.maxForce)
    }
    show() {
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y);

        // strokeWeight(1)
        // fill(255, 50);
        // ellipse(this.pos.x, this.pos.y, this.perception);
    }
}