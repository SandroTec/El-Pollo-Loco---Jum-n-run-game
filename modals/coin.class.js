/**
 * Represents a collectible coin in the game.
 *
 * @class Coin
 * @extends MoveableObject
 */
class Coin extends MoveableObject {

    /** @type {number} Height of the coin */
    height = 150;

    /** @type {number} Width of the coin */
    width = 150;

    /**
     * Collision offset for hitbox calculation
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    };

    /** @type {boolean} Indicates if coin is removed */
    removed = false;

    /**
     * Creates a new coin instance.
     *
     * @param {number} x - Horizontal position
     */
    constructor(x) {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = x;
        this.y = this.getRandomY();
    }

    /**
     * Generates a random vertical position.
     *
     * @returns {number}
     */
    getRandomY() {
        const MIN_Y = 100;
        const RANGE = 100;
        return Math.random() * RANGE + MIN_Y;
    }

    /**
     * Handles coin collection logic and removes collected coins.
     *
     */
    collectCoin() {
        world.level.coins.forEach(coin => {
            if (world.character.isColiding(coin)) {
                coin.removed = true;
            }
        });

        world.level.coins = world.level.coins.filter(
            coin => !coin.removed
        );
    }
}