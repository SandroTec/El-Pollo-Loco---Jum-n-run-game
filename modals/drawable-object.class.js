class DrawableObject {
    img;
    x;
    y;
    height;
    width;
    imageCache = [];
    currentImage = 0;
    energy = 100;
    bottleCollected = false;
    coinCount = 0;

    /**
     * The loadImage function creates a new Image object and sets its source to the specified path.
     * @param path - The `path` parameter in the `loadImage` function is a string that represents the
     * file path or URL of the image that you want to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * The function `loadImages` loads images from an array of paths and stores them in an image cache.
     * @param arr - An array containing paths to images that need to be loaded.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * The draw function in JavaScript uses the canvas context to draw an image at a specified position
     * and size.
     * @param ctx - The `ctx` parameter in the `draw` function is typically the 2D drawing context of
     * an HTML canvas element. This context is used to draw the image specified by `this.img` at the
     * position (`this.x`, `this.y`) with the specified width and height (`this.width`,
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * The function `showHitBox` draws a red outlined rectangle representing the hitbox of a character,
     * chicken, endboss, coin, or bottle on a canvas context.
     * @param ctx - The `ctx` parameter in the `showHitBox` function is the 2D drawing context of the
     * canvas element. It is typically used for drawing shapes, text, images, and other objects on the
     * canvas.
     */
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