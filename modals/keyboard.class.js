class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;
    F;

    btnLeft = document.getElementById('moveLeft');
    btnRight = document.getElementById('moveRight');
    btnJump = document.getElementById('jump');
    btnThrow = document.getElementById('throw');
    
    constructor() {
        this.bindKeyboard();
        this.bindButtons();
    }

    bindKeyboard() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') this.LEFT = true;
            if (e.code === 'ArrowRight') this.RIGHT = true;
            if (e.code === 'Space') this.SPACE = true;
            if (e.code === 'KeyD') this.D = true;
        });
        window.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft') this.LEFT = false;
            if (e.code === 'ArrowRight') this.RIGHT = false;
            if (e.code === 'Space') this.SPACE = false;
            if (e.code === 'KeyD') this.D = false;
        });
    }

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