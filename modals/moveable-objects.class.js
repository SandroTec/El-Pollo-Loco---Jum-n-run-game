
class MoveableObject {
    x;
    y;
    img;
    height;
    width;
    imageCache = [];
    speed = 0.25;
    currentImage = 0;
    otherDirection = false;
    speed_y = 0;
    acceleration = 5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speed_y > 0) {
                this.y -= this.speed_y;
                this.speed_y -= this.acceleration;
            }}, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 180
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // modulo operator: if the currentImage is bigger than the length of the array, it will start again from the beginning of the array.
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speed_y = 30;
    }
    
}