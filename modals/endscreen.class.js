/**
 * Represents the end screen displayed after game over.
 *
 * @class Endscreen
 * @extends DrawableObject
 */
class Endscreen extends DrawableObject {

    /**
     * Creates a new Endscreen instance.
     */
    constructor() {
        super();

        this.loadImage('img/9_intro_outro_screens/game_over/game over!.png');

        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}