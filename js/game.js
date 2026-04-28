let canvas;
let world;
let keyboard = new Keyboard();
let controllPopUp = document.getElementById('controllPopUp');
let controllInformation = document.getElementById('controllInformation');

/**
 * Initializes the game by retrieving the canvas element
 * and creating a new World instance.
 *
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    controllInformation.style.display = 'none';
}

/**
 * used when button on the right corner of the canvas is clicked.
 * opens a pop-up dialog, by edit display.
 * */ 
function controllPopUpDialog() {
    if (controllInformation.style.display === 'none') {
        controllInformation.style.display = 'flex';
    } else {
        controllInformation.style.display = 'none';
    }
}

/**
 * @function gameStart
 * @description Starts the game loop and sets up the initial level state.
 * Prevents multiple starts if the game is already running.
 */
function gameStart() {
    if (world.isPlaying) return
    const level1 = initLevel();  
    world.level = level1; 
    world.isPlaying = true;      
    world.draw();
    world.run();
}

/**
 * Resets the game state to allow restarting.
 * Restores player stats, resets enemies,
 * and displays the start screen.
 *
 * @returns {void}
 */
function restart() {
        resetCharacter();
        world.youWon = false;
        restartBtn.style.display = 'none';
        gameStart()
    }

    function backToHome() {
        resetCharacter();
        world.level.enemies = world.level.enemies.filter(obj => obj.boss)
        world.level.enemies.forEach(enemy => {
            enemy.enemyDead = false;
            enemy.energy = 100;
            enemy.x = (200 + Math.random() * 500);
            });
        world.isPlaying = false;
        world.youWon = false;
        world.drawStartscreen();
    }
/**
 * Requests fullscreen mode for the game canvas.
 *
 * @returns {void}
 */
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
    if (e.keyCode === 67) { // c
        keyboard.C = true;
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
    if (e.keyCode === 67) { // c
        keyboard.C = false;
    }
});

canvas = document.getElementById('canvas');
    
startBtn = document.getElementById('startBtn');
homeBtn = document.getElementById('homeBtn');


startBtn.addEventListener("click", (event) => {
    this.handleClick(event);
})
homeBtn.addEventListener("click", (event) => {
    this.handleHomeClick(event);
})
/**
 * The handleClick function starts the game if it is not already playing and the character is not
 * dying.
 * @param event - The `event` parameter in the `handleClick` function represents the event object that
 * is generated when the click event occurs. This object contains information about the event, such as
 * the type of event, the target element that was clicked, and any other relevant data associated with
 * the event. In this case
 * @returns In the provided code snippet, if the conditions for `gameStart()` are not met, the function
 * will return `undefined`.
 */
function handleClick(event) {
    if (!world.isPlaying && !world.youWon && !world.character.isDead()) {
        gameStart();
        startBtn.style.display = 'none';

    } else return;
}

function handleHomeClick(event) {
    if (world.youWon || world.character.isDead()) {
        backToHome();
        homeBtn.style.display = 'none';
        startBtn.style.display = 'block';
    } else return;
}

function resetCharacter() {
    world.character.x = 0;
    world.character.isDying = false;
    world.character.energy = 100;
    world.character.speed = 10;
    world.character.coinCount = 0;
    world.character.deathStartTime = null;
    world.character.deathSoundPlayed = false;
    world.character.deathSequenceStarted = false;
}


