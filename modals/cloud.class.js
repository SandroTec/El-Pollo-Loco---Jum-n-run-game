/**
 * Represents a cloud in the background.
 * Moves slowly across the screen to create a parallax effect.
 *
 * @class Cloud
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {

    /** @type {number} Cloud height in pixels */
    height = 150;

    /** @type {number} Cloud width in pixels */
    width = 350;

    /**
     * Creates a new Cloud instance.
     *
     * @param {string} cloudeImage - Path to the cloud image.
     * @param {number} x - Initial horizontal position.
     */
    constructor(cloudeImage, x) {
        super().loadImage(cloudeImage);

        this.x = x;
        this.y = this.getRandomYPosition();

        this.animate();
    }

    /**
     * Generates a random vertical position for the cloud.
     *
     * @returns {number} Random Y position.
     */
    getRandomYPosition() {
        const MAX_Y = 100;
        return Math.random() * MAX_Y;
    }

    /**
     * Starts cloud movement.
     *
     * @returns {void}
     */
    animate() {
        this.moveLeft();
    }
}