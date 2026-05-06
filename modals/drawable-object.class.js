/**
 * Base class for all drawable objects.
 *
 * @class DrawableObject
 */
class DrawableObject {

    /** @type {HTMLImageElement} Current image */
    img;

    /** @type {number} X position */
    x;

    /** @type {number} Y position */
    y;

    /** @type {number} Object height */
    height;

    /** @type {number} Object width */
    width;

    /**
     * Cache for loaded images
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = [];

    /** @type {number} Current animation frame index */
    currentImage = 0;

    /** @type {number} Energy value */
    energy = 100;

    /** @type {boolean} Bottle collected state */
    bottleCollected = false;

    /** @type {number} Coin counter */
    coinCount = 0;

    /**
     * Loads a single image.
     *
     * @param {string} path - Path to image
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images into cache.
     *
     * @param {string[]} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on canvas.
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a hitbox for debugging purposes.
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    showHitBox(ctx) {
        const isDrawable =
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Bottle;

        if (!isDrawable) return;

        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'red';

        ctx.strokeRect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );

        ctx.stroke();
    }
}