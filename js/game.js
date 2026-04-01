let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('my character is: ', world.character);
    console.log('my enemies are: ', world.enemies);
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode === 38) { // UP arrow
        keyboard.UP = true;
    }
    if (e.keyCode === 39) { // RIGHT arrow
        keyboard.RIGHT = true;
    }
    if (e.keyCode === 37) { // LEFT arrow
        keyboard.LEFT = true;
    }
    if (e.keyCode === 40) { // DOWN arrow
        keyboard.DOWN = true;
    }
    if (e.keyCode === 32) { // SPACE bar
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode === 38) { // UP arrow
        keyboard.UP = false;
    }
    if (e.keyCode === 39) { // RIGHT arrow
        keyboard.RIGHT = false;
    }
    if (e.keyCode === 37) { // LEFT arrow
        keyboard.LEFT = false;
    }
    if (e.keyCode === 40) { // DOWN arrow
        keyboard.DOWN = false;
    }
    if (e.keyCode === 32) { // SPACE bar
        keyboard.SPACE = false;
    }
});