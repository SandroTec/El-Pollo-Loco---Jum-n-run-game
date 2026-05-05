
/**
 * Creates and initializes the full game level configuration.
 * Includes enemies, environment objects, collectibles and UI elements.
 *
 * @returns {Level}
 */
function initLevel() {

    /**
     * Helper: creates repeated clouds with pattern offset.
     * @param {string} img
     * @param {number[]} positions
     * @returns {Cloud[]}
     */
    const createClouds = (img, positions) =>
        positions.map(x => new Cloud(img, x));

    /**
     * Creates sky tiles including negative offset for seamless scrolling.
     *
     * @param {number} count
     * @returns {Sky[]}
     */
    const createSky = (count) =>
        Array.from({ length: count }, (_, i) => new Sky(720 * (i - 1)));

    return new Level(

        // ================= ENEMIES =================
        [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),

            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),

            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),

            new Endboss()
        ],

        // ================= CLOUDS =================
        [
            ...createClouds('img/5_background/layers/4_clouds/1.png',
                [-600, 20, 720 * 2, 720 * 3, 720 * 5, 720 * 7, 720 * 9]
            ),

            ...createClouds('img/5_background/layers/4_clouds/2.png',
                [-350, 750, 720 * 2 + 350, 720 * 4 + 350, 720 * 6 + 350, 720 * 8 + 350]
            )
        ],

        // ================= BACKGROUND =================
        [
            new Background('img/5_background/layers/3_third_layer/2.png', -720),
            new Background('img/5_background/layers/2_second_layer/2.png', -720),
            new Background('img/5_background/layers/1_first_layer/2.png', -720),

            new Background('img/5_background/layers/3_third_layer/1.png', 0),
            new Background('img/5_background/layers/2_second_layer/1.png', 0),
            new Background('img/5_background/layers/1_first_layer/1.png', 0),

            new Background('img/5_background/layers/3_third_layer/2.png', 720),
            new Background('img/5_background/layers/2_second_layer/2.png', 720),
            new Background('img/5_background/layers/1_first_layer/2.png', 720),

            new Background('img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new Background('img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new Background('img/5_background/layers/1_first_layer/1.png', 720 * 2),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 3),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 4),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 4),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 4),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 5),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 5),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 5),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 6),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 6),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 6),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 7),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 7),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 7),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 8),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 8),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 8),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 9),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 9),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 9),

            new Background('img/5_background/layers/3_third_layer/2.png', 720 * 10),
            new Background('img/5_background/layers/2_second_layer/2.png', 720 * 10),
            new Background('img/5_background/layers/1_first_layer/2.png', 720 * 10),
        ],

        // ================= SKY =================
        createSky(11),

        // ================= COINS =================
        [
            new Coin(720),
            new Coin(100 * Math.random() + 720 * 7),
            new Coin(100 * Math.random() + 720 * 2),
            new Coin(300 * Math.random() + 720 * 5),
            new Coin(720 * 8)
        ],

        // ================= BOTTLES =================
        [
            new Bottle(500 * Math.random() + 300),
            new Bottle(500 * Math.random() + 800),
            new Bottle(500 * Math.random() + 1300),
            new Bottle(500 * Math.random() + 2300),
            new Bottle(500 * Math.random() + 4300),
        ],

        // ================= UI =================
        [
            new Statusbar_health(),
            new Statusbar_coin(),
            new Statusbar_bottle(),
        ],

        // ================= WIN SCREEN =================
        new Win()
    );
}