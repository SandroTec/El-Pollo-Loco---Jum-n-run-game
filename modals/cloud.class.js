class Cloud extends MoveableObject {

    height = 150;
    width = 350;

    constructor(cloudeImage, x) {
        super().loadImage(cloudeImage);
        this.x = x;
        this.y = Math.random() * 100;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
    
}