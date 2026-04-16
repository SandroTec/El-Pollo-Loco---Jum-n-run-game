let canvas;
let world;
let keyboard = new Keyboard();

let mobileControlls = document.getElementById('mobileControllBtns');
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function gameStart() {
    if (world.isPlaying) return
    const level1 = initLevel();  
    world.level = level1; 
    world.isPlaying = true;      
    world.draw();
    world.run();
    if (window.innerWidth <= 800)
        {
            mobileControlls.style.display = 'flex';
        }
}

function restart() {
        world.character.x = 0;
        world.character.isDying = false;
        world.character.energy = 100;
        world.level.enemies = world.level.enemies.filter(obj => obj.boss)
        world.level.enemies.forEach(enemy => {
            enemy.enemyDead = false;
            enemy.energy = 100;
            enemy.x = (200 + Math.random() * 500);
            
            });
        world.character.coinCount = 0;
            
        world.drawStartscreen();
        
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
    if (e.keyCode === 70) { // f
        keyboard.F = true;
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
    if (e.keyCode === 70) { // f
        keyboard.F = true;
    }
});

canvas = document.getElementById('canvas');
        
canvas.addEventListener("click", (event) => {
    this.handleClick(event);
})

function handleClick(event) {
    if (!world.isPlaying && !world.character.isDying) {
        gameStart();
    } else return;
}


