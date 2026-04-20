class SoundManager {
    constructor() {
        this.sounds = {
            jump: new Audio('./sounds/jump.mp3'),
            stomp: new Audio('./sounds/stomp.mp3'),
            hit: new Audio('./sounds/splat.mp3'),
        };

        this.walkSounds = [
            new Audio('./sounds/walking1.mp3'),
        ];
    }

    play(name) {
        const sound = this.sounds[name];
        if (!sound) return;

        sound.currentTime = 0;
        sound.play();
    }

    playWalk() {
        const sound = this.walkSounds[Math.floor(Math.random() * this.walkSounds.length)];
        sound.currentTime = 0;
        sound.play();
    }
}