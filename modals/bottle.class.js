/**
 * Represents a collectible bottle in the game world.
 * Extends MoveableObject for positioning and collision handling.
 *
 * @class Bottle
 * @extends MoveableObject
 */
class Bottle extends MoveableObject {

    /** @type {number} */
    height = 150;

    /** @type {number} */
    width = 150;

    /** @type {boolean} */
    removed = false;

    /** @type {{top:number,left:number,right:number,bottom:number}} */
    offset = {
        top: 23,
        left: 60,
        right: 60,
        bottom: 18
    };

    /**
     * Creates a new Bottle instance at a given x position.
     * The y position is randomized within a defined range.
     *
     * @param {number} x - Horizontal spawn position.
     */
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.x = x;
        this.y = this.getRandomYPosition();
    }

    /**
     * Generates a random Y position within a defined range.
     *
     * @returns {number} Random vertical position.
     */
    getRandomYPosition() {
        const MIN_Y = 100;
        const RANGE = 100;

        return Math.random() * RANGE + MIN_Y;
    }

    /**
     * Marks the bottle as collected and removes it from the world.
     *
     */
    collectBottle() {
        this.removed = true;

        world.level.bottles = world.level.bottles.filter(
            bottle => !bottle.removed
        );
    }
}