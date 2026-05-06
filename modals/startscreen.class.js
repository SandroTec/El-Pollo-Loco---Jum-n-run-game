/**
 * Represents the start screen background of the game.
 * Extends DrawableObject for rendering on the canvas.
 */
class Startscreen extends DrawableObject {

    /** @type {number} */
    width;

    /** @type {number} */
    height;

    /** @type {number} */
    x;

    /** @type {number} */
    y;

    /**
     * Creates a new Startscreen instance.
     * Loads the start screen image and sets default canvas position and size.
     */
    constructor() {
        super();
        this.loadImage('img/9_intro_outro_screens/start/startscreen_2.png');
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}