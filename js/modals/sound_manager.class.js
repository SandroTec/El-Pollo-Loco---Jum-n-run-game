/**
 * Manages all game sound effects, background audio and mute state.
 * Provides centralized audio control for the entire game.
 */
class SoundManager {

    /** @type {HTMLButtonElement | null} */
    muteBtn;

    /** @type {HTMLImageElement | null} */
    muteIcon;

    /** @type {boolean} */
    isMuted;

    /**
     * Collection of all game sound effects.
     * @type {Object.<string, HTMLAudioElement>}
     */
    sounds;

    /**
     * Array of all audio elements for global control operations.
     * @type {HTMLAudioElement[]}
     */
    allSounds;

    /**
     * Creates a new SoundManager instance.
     * Initializes all audio assets, mute state and UI bindings.
     */
    constructor() {
        this.muteBtn = document.getElementById('muteBtn');
        this.muteIcon = document.getElementById('muteIcon');
        this.isMuted = sessionStorage.getItem('mute') === 'true';
        this.sounds = {
            jump: this.createAudio('./sounds/character/assets_audio_character_characterJump.wav'),
            stomp: this.createAudio('./sounds/character/stomp.mp3'),
            hit: this.createAudio('./sounds/character/assets_audio_character_characterDamage.mp3'),
            bottle: this.createAudio('./sounds/assets_audio_throwable_bottleBreak.mp3'),
            walk: this.createAudio('./sounds/character/assets_audio_character_characterRun.mp3'),
            characterDying: this.createAudio('./sounds/character/assets_audio_character_characterDead.wav'),
            chickenDying: this.createAudio('./sounds/enemies/assets_audio_chicken_chickenDead.mp3'),
            endbossAlert: this.createAudio('./sounds/enemies/assets_audio_endboss_endbossApproach.wav'),
            endbossHurt: this.createAudio('./sounds/enemies/assets_audio_chicken_chickenDead2.mp3'),
            collectSound: this.createAudio('./sounds/assets_audio_collectibles_collectSound.wav'),
            splat: this.createAudio('./sounds/enemies/splat.mp3'),
            snoring: this.createAudio('./sounds/character/assets_audio_character_characterSnoring.mp3')
        };
        this.allSounds = Object.values(this.sounds);
        this.updateMuteButton();
        this.setMuted(this.isMuted);
    }

    /**
     * Creates and configures an audio element.
     *
     * @param {string} src - Path to the audio file.
     * @returns {HTMLAudioElement}
     */
    createAudio(src) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        return audio;
    }

    /**
     * Plays a short one-shot sound effect.
     * Prevents overlapping playback of the same sound.
     *
     * @param {string} name - Name of the sound key.
     */
    play(name) {
        const sound = this.sounds[name];
        if (!sound || !sound.paused) return;

        sound.volume = 0.12;
        sound.play().catch(() => {});

        this.resetAfterDelay(sound, 3000);
    }

    /**
     * Resets an audio element after a delay.
     *
     * @param {HTMLAudioElement} sound
     * @param {number} delay
     */
    resetAfterDelay(sound, delay) {
        setTimeout(() => {
            sound.pause();
            sound.currentTime = 0;
        }, delay);
    }

    /**
     * Plays walking sound in a loop.
     */
    playWalk() {
        const sound = this.sounds.walk;
        sound.loop = true;
        sound.volume = 0.025;
        sound.play().catch(() => {});
    }

    /**
     * Stops walking sound and resets playback.
     */
    stopWalk() {
        this.resetSound(this.sounds.walk);
    }

    /**
     * Plays snoring sound in a loop.
     */
    playSnoring() {
        const sound = this.sounds.snoring;
        sound.loop = true;
        sound.volume = 0.05;
        sound.play().catch(() => {});
    }

    /**
     * Stops snoring sound.
     */
    stopSnoring() {
        this.resetSound(this.sounds.snoring);
    }

    /**
     * Resets a sound (pause + rewind).
     *
     * @param {HTMLAudioElement} sound
     */
    resetSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Enables or disables mute mode for all sounds.
     *
     * @param {boolean} muted
     */
    setMuted(muted) {
        this.isMuted = muted;

        this.allSounds.forEach(sound => {
            sound.muted = muted;
        });

        sessionStorage.setItem('mute', String(muted));
        this.updateMuteButton();
    }

    /**
     * Toggles mute state.
     *
     */
    toggleMute() {
        this.setMuted(!this.isMuted);
    }

    /**
     * Updates mute button icon based on current state.
     *
     */
    updateMuteButton() {
        if (!this.muteIcon) return;

        this.muteIcon.src = this.isMuted
            ? './img/mute-icon.svg'
            : './img/sound-icon.svg';
    }

    /**
     * Stops all currently playing sounds and resets them.
     *
     */
    stopAll() {
        this.allSounds.forEach(this.resetSound);
    }
}