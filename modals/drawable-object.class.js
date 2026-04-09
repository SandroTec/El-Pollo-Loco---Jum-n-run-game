class DrawableObject {
    img;
    x;
    y;
    height;
    width;
    imageCache = [];
    currentImage = 0;
    percentage = 100;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    showHitBox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x + this.offset.left, 
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom);
        ctx.stroke();
       }
    }
}