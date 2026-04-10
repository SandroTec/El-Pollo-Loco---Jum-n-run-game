let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

}

function gameStart() {
    return true
}
function gameRestart() {
    return true
}

function setCanvasToFullscreen() {
    canvas.requestFullscreen()
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
    if (e.keyCode === 68) { // d
        keyboard.D = true;
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
    if (e.keyCode === 68) { // d
        keyboard.D = false;
    }
});

canvas = document.getElementById('canvas');
        
canvas.addEventListener("click", (event) => {
    this.handleClick(event);
})

function handleClick(event) {
        world.character.isAlive = true;
        gameStart()
        
}

