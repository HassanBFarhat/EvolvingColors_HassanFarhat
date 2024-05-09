class Animat {
    constructor(theOther, theAuto) {
        this.automata = theAuto;
        this.hue = theOther.hue;
        this.x = theOther.x;
        this.y = theOther.y;
        this.energy = 10;
        this.size = parseInt(document.getElementById("animatsize").value);
    }

    movement() {
        let bestX = this.x;
        let bestY = this.y;
        let bestDiff = Infinity;
    
        for (let i = -1; i <= 1; i++) {
            const newX = this.normalize(this.x + i, params.dimension);
            for (let j = -1; j <= 1; j++) {
                const newY = this.normalize(this.y + j, params.dimension);
                if (i === 0 && j === 0) continue;
                const plant = this.automata.plants[newX][newY];
                const diff = Math.abs(this.hue - (plant ? plant.hue : Infinity));
                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestX = newX;
                    bestY = newY;
                }
            }
        }
    
        this.x = bestX;
        this.y = bestY;
    }

    consumeFood() {
        const growRate = parseInt(document.getElementById("animatgrowth").value);
        const select = parseInt(document.getElementById("animatselection").value);
        const plant = this.automata.plants[this.x][this.y];

        if (!plant) return; 
        const diff = this.hueDifference(plant);
        
        if (diff < select) return;
        this.automata.plants[this.x][this.y] = null;
        this.energy += 50 / growRate * diff;
    }

    reproduction() {
        if (this.energy <= 50) return;
        this.energy -= 50;
        gameEngine.addEntity(new Animat(this.mutation(), this.automata));
    }

    mutation() {
        const newX = this.normalize(this.x - 1 + randomInt(3), params.dimension);
        const newY = this.normalize(this.y - 1 + randomInt(3), params.dimension);
        const hue = this.normalize(this.hue - 10 + randomInt(21), 360);
        return { hue: hue, x: newX, y: newY };
    }

    die() {
        this.removeFromWorld = true;
    }

    normalize(theVal, theMax) {
        return (theVal + theMax) % theMax;
    }

    checkForDeath() {
        if (this.energy < 1 || Math.random() < 0.01) {
            this.die();
        }
    }

    hueDifference(thePlant) {
        let diff = Math.abs(this.hue - thePlant.hue);
        diff = Math.min(diff, 360 - diff);
        return (90 - diff) / 90;
    }

    update() {
        this.movement();
        this.consumeFood();
        this.reproduction();
        this.checkForDeath();
    }

    draw(ctx) {
        ctx.fillStyle = `hsl(${this.hue}, 75%, 50%)`;
        ctx.strokeStyle = "light gray";
        ctx.beginPath();
        ctx.arc((this.x + 0.5) * params.size, 
                (this.y + 0.5) * params.size, 
                this.size / 2,
                0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
