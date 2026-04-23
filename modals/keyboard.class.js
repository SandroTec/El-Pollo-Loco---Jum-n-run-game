class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;
    C = false;

    btnLeft = document.getElementById('moveLeft');
    btnRight = document.getElementById('moveRight');
    btnJump = document.getElementById('jump');
    btnThrow = document.getElementById('throw');

    constructor() {
        this.bindKeyboard();
        this.bindButtons();
    }

    /**
     * The `bindKeyboard` function in JavaScript listens for keydown and keyup events to set boolean
     * values based on the pressed keys.
     */
    bindKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') this.LEFT = true;
            if (e.code === 'ArrowRight') this.RIGHT = true;
            if (e.code === 'Space') this.SPACE = true;
            if (e.code === 'KeyD') this.D = true;
            if (e.code === 'KeyC') this.C = true;
        });
        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft') this.LEFT = false;
            if (e.code === 'ArrowRight') this.RIGHT = false;
            if (e.code === 'Space') this.SPACE = false;
            if (e.code === 'KeyD') this.D = false;
            if (e.code === 'KeyC') this.C = false;
        });
    }

    /**
     * The `bindButtons` function sets up event listeners for buttons to track key states for left,
     * right, jump, and throw actions.
     */
    bindButtons() {
        const bind = (btn, key) => {
            btn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                this[key] = true; 
            });
            btn.addEventListener('pointerup', () => this[key] = false);
            btn.addEventListener('pointerleave', () => this[key] = false);
            btn.addEventListener('pointercancel', () => this[key] = false); 
        };
        bind(this.btnLeft, 'LEFT');
        bind(this.btnRight, 'RIGHT');
        bind(this.btnJump, 'SPACE');
        bind(this.btnThrow, 'D');
    }
}