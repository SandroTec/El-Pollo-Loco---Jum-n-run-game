/**
 * Represents a background element in the game world.
 * Extends MoveableObject to allow positioning and rendering.
 *
 * @class Background
 * @extends MoveableObject
 */
class Background extends MoveableObject {

    /** @type {number} */
    height = 400;

    /** @type {number} */
    width = 720;

    /**
     * Creates a new Background instance.
     *
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - Horizontal position of the background.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);

        this.x = x;
        this.y = this.getGroundLevel();
    }

    /**
     * Calculates the vertical ground position for the background.
     *
     * @returns {number} Y position aligned to ground level.
     */
    getGroundLevel() {
        const GROUND_Y = 480;
        return GROUND_Y - this.height;
    }
}