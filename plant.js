class Plant {
    constructor(theOther, theAuto) {
        this.automata = theAuto;
        this.hue = theOther.hue;
        this.x = theOther.x;
        this.y = theOther.y;
        this.growth = 0;
        this.growthRate = parseInt(document.getElementById("plantgrowth").value);
        this.size = parseInt(document.getElementById("plantsize").value);
    }

    mutation() {
        const newX = this.normalize(this.x - 1 + randomInt(3), params.dimension);
        const newY = this.normalize(this.y - 1 + randomInt(3), params.dimension);
        const hue = this.normalize(this.hue - 10 + randomInt(21), 360);
        return { hue: hue, x: newX, y: newY };
    }

    reproduce() {
        const other = this.mutation();
        if (!this.automata.plants[other.x][other.y]) {
            this.automata.plants[other.x][other.y] = new Plant(other, this.automata);
            this.growth -= 50;
        }
    }

    normalize(theVal, theMax) {
        return (theVal + theMax) % theMax;
    }

    update() {
        if (this.growth < 50) {
            this.growth += 50 / this.growthRate;
        }
        if (this.growth >= 50) {
            this.reproduce();
        }
    }

    draw(ctx) {
        const hue = this.hue;
        const growth = this.growth;
        ctx.fillStyle = `hsl(${hue}, ${20 + growth}%, 50%)`;
        ctx.strokeStyle = "dark gray";
        ctx.fillRect(this.x * params.size, 
                     this.y * params.size, 
                     this.size,
                     this.size);
        ctx.strokeRect(this.x * params.size, 
                       this.y * params.size, 
                       this.size,
                       this.size);
    }
}
