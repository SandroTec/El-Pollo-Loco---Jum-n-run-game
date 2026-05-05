/**
 * Represents a sky/background layer object in the game world.
 * Extends MoveableObject for rendering and movement capabilities.
 */
class Sky extends MoveableObject {

    /** @type {number} */
    x;

    /** @type {number} */
    y;

    /** @type {number} */
    height;

    /** @type {number} */
    width;

    /**
     * Creates a sky background layer positioned at a specific x-coordinate.
     *
     * @param {number} x - Horizontal position of the sky layer.
     */
    constructor(x) {
        super();

        this.x = x;
        this.y = 0;
        this.height = 480;
        this.width = 720;

        this.loadImage('img/5_background/layers/air.png');
    }
}