let canvas = document.getElementById('canvas');;
let world;
const keyboard = new Keyboard();
const controllInformation = document.getElementById('controllInformation');
const gameBtns = document.getElementById('gameBtns');
const mobileControlls = document.getElementById('mobileControllBtns');
const startBtn = document.getElementById('startBtn');
const homeBtn = document.getElementById('homeBtn');
const isHidden = gameBtns.style.display === 'none';

/**
 * Initializes the game and creates the world instance.
 * @function init
 */
function init() {
    world = new World(canvas, keyboard);
    controllInformation.style.display = 'none';
}

/**
 * Toggles the control information popup visibility.
 * @function toggleControllPopUpDialog
 */
function controllPopUpDialog() {
    
    controllInformation.showModal()
    controllInformation.style.display = 'flex';
}

controllInformation.addEventListener('click', (e) => {
  if (e.target === controllInformation) {
    controllInformation.close();
    controllInformation.style.display = 'none';

  }
});

/**
 * Starts the game if not already running.
 * @function gameStart
 */
function gameStart() {
    if (world.isPlaying) return;
    resetCharacter();
    world.level = initLevel();
    world.isPlaying = true;
    world.running = true;
    world.endbossActivated = false;
    world.draw();
    world.loopmanager.run();
    
}

/**
 * Restarts the game and resets state.
 * @function restart
 */
function restart() {
    world.stop()
    backToHome();
    handleClick();
}

/**
 * Resets game to start screen.
 * @function backToHome
 */
function backToHome() {
    resetCharacter();
    world.isPlaying = false;
    world.youWon = false;
    world.drawStartscreen();
}

/**
 * Enables fullscreen mode for canvas.
 * @function setCanvasToFullscreen
 */
function setCanvasToFullscreen() {
    canvas.requestFullscreen();
}

/**
 * Handles key state changes.
 * @param {KeyboardEvent} e
 * @param {boolean} isPressed
 */
function handleKey(e, isPressed) {
    switch (e.keyCode) {
        case 38: keyboard.UP = isPressed; break;
        case 39: keyboard.RIGHT = isPressed; break;
        case 37: keyboard.LEFT = isPressed; break;
        case 40: keyboard.DOWN = isPressed; break;
        case 32: keyboard.SPACE = isPressed; break;
        case 68: keyboard.D = isPressed; break;
        case 67: keyboard.C = isPressed; break;
    }
}

window.addEventListener('keydown', (e) => handleKey(e, true));
window.addEventListener('keyup', (e) => handleKey(e, false));

/**
 * Handles start button click.
 * @function handleClick
 * @param {Event} [event]
 */
function handleClick(event) {
    if (!world.isPlaying && !world.youWon && !world.character.isDead()) {
        gameStart();
        startBtn.style.display = 'none';
    }
}

/**
 * Handles home button click.
 * @function handleHomeClick
 * @param {Event} event
 */
function handleHomeClick(event) {
    if (world.youWon || world.character.isDead()) {
        backToHome();
        homeBtn.style.display = 'none';
        startBtn.style.display = 'block';
    }
}

/**
 * Resets character to initial state.
 * @function resetCharacter
 */
function resetCharacter() {
    const char = world.character;

    char.x = 0;
    char.isDying = false;
    char.energy = 100;
    char.speed = 10;
    char.coinCount = 0;
    char.bottleCount = 0;
    char.startIdleTime = null;
    char.sleeping = false;
    char.deathStartTime = null;
    char.deathSoundPlayed = false;
    char.deathSequenceStarted = false;
    char.finalKill = false;
    world.throwableObjects = [];
    char.otherDirection = false;
}

/**
 * Initializes UI event listeners.
 * @function initUIEvents
 */
function initUIEvents() {
    startBtn.addEventListener('click', handleClick);
    homeBtn.addEventListener('click', handleHomeClick);
}

// Initial setup
canvas = document.getElementById('canvas');
initUIEvents();