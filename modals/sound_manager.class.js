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
        this.isMuted = sessionStorage.getItem('mute') === 'true';
        
        /**
         * Collection of all game sounds.
         * @type {Object.<string, HTMLAudioElement>}
         */
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
        }

        /**
         * Array of all audio elements for global control.
         * @type {HTMLAudioElement[]}
         */
        this.allSounds = Object.values(this.sounds);

        this.updateMuteButton();
        this.setMuted(this.isMuted);
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
        return audio;
    }

    /**
     * Plays a one-shot sound effect by name.
     *
     * @param {string} name - Name of the sound in the sounds object.
     */
    play(name) {
        const sound = this.sounds[name];
        if (!sound) return;
        if (!sound.paused) return; 
        sound.volume = 0.08;
        sound.play().catch(()=>{});
        setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
    }, 3000);
    }

    /**
     * Starts playing the walking sound in a loop.
     */
    playWalk() {
        const sound = this.sounds.walk;
        sound.loop = true;
        sound.volume = 0.025;
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
            ? './img/mute-icon.svg'
            : './img/sound-icon.svg';
    }

    playSnoring() {
        let snoringSound = this.sounds.snoring
        snoringSound.loop = true;
        snoringSound.volume = 0.05;
        snoringSound.play().catch(() => {});
    }

    stopSnoring() {
        let snoringSound = this.sounds.snoring
        snoringSound.pause();
        snoringSound.currentTime = 0;
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