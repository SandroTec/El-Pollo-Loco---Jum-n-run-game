/**
 * Manages all game sound effects and mute functionality.
 */
class SoundManager {

    /**
     * Creates a new SoundManager instance, initializes audio assets and mute button.
     */
    constructor() {
        /** @type {HTMLButtonElement | null} */
        this.muteBtn = document.getElementById('muteBtn');

        /** @type {HTMLImageElement | null} */
        this.muteIcon = document.getElementById('muteIcon');

        /** @type {boolean} */
        this.isMuted = sessionStorage.getItem('mute');

        this.updateMuteButton();
        /**
         * Collection of all game sounds.
         * @type {Object.<string, HTMLAudioElement>}
         */
        this.sounds = {
            jump: this.createAudio('./sounds/character/assets_audio_character_characterJump.wav'),
            stomp: this.createAudio('./sounds/character/stomp.mp3'),
            hit: this.createAudio('./sounds/character/assets_audio_character_characterDamage.mp3'),
            bottle: this.createAudio('./sounds/assets_audio_throwable_bottleBreak.mp3'),
            walk: this.createAudio('./sounds/character/assets_audio_character_characterRun.mp3')
        };

        /**
         * Array of all audio elements for global control.
         * @type {HTMLAudioElement[]}
         */
        this.allSounds = Object.values(this.sounds);
    }

    /**
     * Creates and configures an audio element.
     *
     * @param {string} src - Path to the audio file.
     * @returns {HTMLAudioElement} The created audio element.
     */
    createAudio(src) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audio.muted = this.isMuted;
        return audio;
    }

    /**
     * Plays a one-shot sound effect by name.
     *
     * @param {string} name - Name of the sound in the sounds object.
     */
    play(name) {
        if (this.isMuted) return;

        const sound = this.sounds[name];
        if (!sound) return;

        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    /**
     * Starts playing the walking sound in a loop.
     */
    playWalk() {
        const sound = this.sounds.walk;
        sound.loop = true;

        sound.play().catch(() => {});
    }

    /**
     * Stops the walking sound and resets its playback position.
     */
    stopWalk() {
        const sound = this.sounds.walk;

        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Sets mute state for all sounds and persists it in sessionStorage.
     *
     * @param {boolean} muted - Whether sound should be muted.
     */
    setMuted(muted) {
        this.isMuted = muted;

        this.allSounds.forEach(sound => {
            sound.muted = muted;
        });

        this.updateMuteButton();

        sessionStorage.setItem('mute', muted);
    }

    /**
     * Toggles mute state.
     */
    toggleMute() {
        this.setMuted(!this.isMuted);
    }

    /**
     * Updates the mute button icon based on current mute state.
     */
    updateMuteButton() {
        if (!this.muteIcon) return;

        this.muteIcon.src = this.isMuted
            ? './img/mute-icon.png'
            : './img/sound-icon.png';
    }

    /**
     * Stops all currently playing sounds and resets them.
     */
    stopAll() {
        this.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}