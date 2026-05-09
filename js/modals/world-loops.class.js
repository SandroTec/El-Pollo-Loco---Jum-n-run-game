/**
 * Class responsible for managing the core game update loop.
 * Handles the timing and execution of game logic updates.
 */
class WorldLoopManager {
    /**
     * @param {World} world - The World instance
     */
    constructor(world) {
        this.world = world;
    }


    /**
     * Starts game update loop.
     */
    run() {
        this.world.runIntervall = setInterval(() => {
            this.world.checkCollisions();
            this.world.checkThrowableObject();
        if (window.innerHeight <= 1024 && window.innerWidth <= 1400) {
            document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            });
        }
        }, 1000 / 60);
    }

}