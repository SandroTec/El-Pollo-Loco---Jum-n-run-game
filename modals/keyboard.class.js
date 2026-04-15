class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;
    F;
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
        const btnLeft = document.getElementById('moveLeft');
        const btnRight = document.getElementById('moveRight');
        const btnJump = document.getElementById('jump');
        const btnThrow = document.getElementById('throw');

        const bind = (btn, key) => {
            btn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                this[key] = true;
            });

            btn.addEventListener('pointerup', () => this[key] = false);
            btn.addEventListener('pointerleave', () => this[key] = false);
            btn.addEventListener('pointercancel', () => this[key] = false);
        };

        bind(btnLeft, 'LEFT');
        bind(btnRight, 'RIGHT');
        bind(btnJump, 'SPACE');
        bind(btnThrow, 'D');
    }
}