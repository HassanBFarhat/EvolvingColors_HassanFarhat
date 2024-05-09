class Automata {
    constructor() {
        this.plants = Array.from({ length: params.dimension }, () =>
            Array.from({ length: params.dimension }, () => null)
        );
    }

    addPlant() {
        const i = randomInt(params.dimension);
        const j = randomInt(params.dimension);
        this.plants[i][j] = new Plant({ hue: randomInt(360), x: i, y: j }, this);
    }

    wipePlants() {
        this.plants.forEach(row => row.fill(null));
    }

    update() {
        this.plants.forEach(row => {
            row.forEach((plant, index) => {
                plant?.update();
                if (Math.random() < 0.001) row[index] = null;
            });
        });
    }

    draw(ctx) {
        this.plants.forEach(row => {
            row.forEach(plant => {
                plant?.draw(ctx);
            });
        });
    }
}
