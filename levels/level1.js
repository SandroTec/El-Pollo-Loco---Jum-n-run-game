function initLevel() {
     return new Level(
        [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', -600),
            new Cloud('img/5_background/layers/4_clouds/2.png', -350),
            new Cloud('img/5_background/layers/4_clouds/1.png', 20),
            new Cloud('img/5_background/layers/4_clouds/2.png', 750),
            new Cloud('img/5_background/layers/4_clouds/1.png', 720*2),
            new Cloud('img/5_background/layers/4_clouds/2.png', 720*2 + 350),
        ],
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

            new Background('img/5_background/layers/3_third_layer/1.png', 720*2),
            new Background('img/5_background/layers/2_second_layer/1.png', 720*2),
            new Background('img/5_background/layers/1_first_layer/1.png', 720*2),

            new Background('img/5_background/layers/3_third_layer/2.png', 720*3),
            new Background('img/5_background/layers/2_second_layer/2.png', 720*3),
            new Background('img/5_background/layers/1_first_layer/2.png', 720*3), 
        ],
        [
            new Sky(-720),
            new Sky(0),
            new Sky(720),
            new Sky(720*2),
            new Sky(720*3)
        ],
        [
            new Coin(720),
            new Coin((1000 * Math.random() + 720)),
            new Coin((100 * Math.random() + 720*2))
        ],
        bottle = new Bottle(500 * Math.random() + 300), 
        [
            new Statusbar_health(),
            new Statusbar_coin(),
            new Statusbar_bottle(),
        ],
        win = new Win()
    );
}