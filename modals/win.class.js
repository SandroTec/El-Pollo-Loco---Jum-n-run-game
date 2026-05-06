/**
 * Represents the win screen displayed when the player completes the game successfully.
 * Extends DrawableObject for rendering on the canvas.
 */
class Win extends DrawableObject {

    /** @type {number} */
    width;

    /** @type {number} */
    height;

    /** @type {number} */
    x;

    /** @type {number} */
    y;

    /**
     * Creates a new Win screen instance.
     * Loads win screen image and sets default position and size.
     */
    constructor() {
        super();
        this.loadImage('img/You won, you lost/You Win A.png');
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}